import { Fragment } from 'react';

import styles from './countsforvalues.module.css';


function Value({ label, value }) {
  if (label === undefined && value === undefined) return;

  return (
    <div className={styles['chart--counts-for-values--value']}>
      {label && (
        <div className={styles['chart--counts-for-values--label']}>
          {label}
        </div>
      )}
      {value && (<>{value}</>)}
    </div>
  );
}

function TopCount({ ...args }) {
  return (<Count {...args} type="top" />);
}

function BottomCount({ ...args }) {
  return (<Count {...args} type="bottom" />);
}

function Count({ type, label, count, countCeiling }) {
  if (label === undefined && count === undefined) return;

  const heightPercentage = `${(count / countCeiling) * 100}%`;

  return (
    <div className={styles[`chart--counts-for-values--${type}-count`]}>
      {label && (
        <div className={styles[`chart--counts-for-values--${type}-count--label`]}>
          {label}
        </div>
      )}
      {count !== undefined && (
        <div
          className={styles[`chart--counts-for-values--${type}-count--full-bar`]}
        >
          <div
            className={styles[`chart--counts-for-values--${type}-count--bar`]}
            style={{ height: heightPercentage, }}
          >
            {count}
            <br />
            {heightPercentage}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CountsForValues({
  orderedCountsAtValues,
  topCountLabel,
  bottomCountLabel,
  valueLabel,
}) {
  const isTopOnly = topCountLabel && !bottomCountLabel;
  const isBottomOnly = bottomCountLabel && !topCountLabel;
  const isTopAndBottom = topCountLabel && bottomCountLabel;

  const highestCount = orderedCountsAtValues.reduce((curHighest, {
    topCount = 0,
    bottomCount = 0,
  }) => {
    return Math.max(topCount, bottomCount, curHighest);
  }, 0);

  const gridContainerStyles = [
    styles['chart--counts-for-values'],
    isTopOnly ? styles['chart--top-counts-for-values'] : undefined,
    isBottomOnly ? styles['chart--bottom-counts-for-values'] : undefined,
    isTopAndBottom ? styles['chart--top-and-bottom-counts-for-values'] : undefined,
  ].join(' ');

  return (
    <div className={gridContainerStyles}>
      <TopCount label={topCountLabel} />
      <Value label={valueLabel} />
      <BottomCount label={bottomCountLabel} />
      {orderedCountsAtValues.map(({
        value,
        topCount = 0,
        bottomCount = 0,
      }) => (
        <Fragment key={`CountsForValuesChart--for-${value}`}>
          <TopCount
            count={isTopOnly || isTopAndBottom ? topCount: undefined}
            countCeiling={highestCount}
          />
          <Value value={value} />
          <BottomCount
            count={isBottomOnly || isTopAndBottom ? bottomCount : undefined}
            countCeiling={highestCount}
          />
        </Fragment>
      ))}
    </div>
  );
}