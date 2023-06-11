import { Fragment } from 'react';

import styles from './countsforvalues.module.css';


function Value({ ariaLabel, label, value }) {
  if (label === undefined && value === undefined) return;

  return (
    <div
      className={styles['chart--counts-for-values--value']}
      aria-label={ariaLabel}
    >
      {label && (
        <div className={styles['chart--counts-for-values--label']}>
          {label}
        </div>
      )}
      {value !== undefined && (
        <div className={styles[`chart--counts-for-values--value--full-bar`]}>
          <div className={styles['chart--counts-for-values--value']}>
            {value}
          </div>
        </div>
      )}
    </div>
  );
}

function TopCount({ ...args }) {
  return (<Count {...args} type="top" />);
}

function BottomCount({ ...args }) {
  return (<Count {...args} type="bottom" />);
}

function Count({ type, ariaLabel, value, label, count, countLabel, countCeiling, }) {
  if (label === undefined && count === undefined) return;

  const heightPercentageNum = (count / countCeiling) * 100;
  const heightPercentage = `${heightPercentageNum}%`;
  const roundedHeightPercentage = `${
    heightPercentageNum % 1 === 0
    ? heightPercentageNum
    : heightPercentageNum.toFixed(1)
  }%`;

  // if no aria label is provided, use the one that includes the calculated height percentage
  if(ariaLabel === undefined) {
    ariaLabel = `${type} count for value "${value}" of ${count} "${countLabel}" covering ${roundedHeightPercentage} of available column space`;
  }

  return (
    <div
      className={styles[`chart--counts-for-values--${type}-count`]}
      aria-label={ariaLabel.toLowerCase()}
    >
      {label && (
        <div className={styles[`chart--counts-for-values--${type}-count--label`]}>
          {label}
        </div>
      )}
      {count !== undefined && (
        <div className={styles[`chart--counts-for-values--${type}-count--full-bar`]}>
          <div
            className={styles[`chart--counts-for-values--${type}-count--bar`]}
            style={{ height: heightPercentage, }}
          >
            {count}
            <br />
            {roundedHeightPercentage}
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

  // determine classes for grid container
  const gridContainerStyles = [
    styles['chart--counts-for-values'],
    isTopOnly ? styles['chart--top-counts-for-values'] : undefined,
    isBottomOnly ? styles['chart--bottom-counts-for-values'] : undefined,
    isTopAndBottom ? styles['chart--top-and-bottom-counts-for-values'] : undefined,
  ].join(' ');

  // determine aria label for chart
  let chartLabel = '';

  if (isTopAndBottom) {
    chartLabel = `chart visualizing both`
      + ` a count of "${topCountLabel}" with a column on the top of each "${valueLabel}",`
      + ` and a count of "${bottomCountLabel}" with a column on the bottom of each "${valueLabel}"`;
  }
  else if (isTopOnly) {
    chartLabel = `chart visualizing`
      + ` a count of "${topCountLabel}" with a column on top of each "${valueLabel}"`;
  }
  else if (isBottomOnly) {
    chartLabel = `chart visualizing`
      + ` a count of "${bottomCountLabel}" with a column on the bottom of each "${valueLabel}"`;
  }

  const formValueLabel = (value) => {
    let valueLabel = '';

    if (isTopAndBottom) {
      valueLabel = `label for specific value of "${value}"`
        + ` top count of "${topCountLabel}" available in the previous element`
        + ` and a bottom count of "${bottomCountLabel}" available in the following element`;
    }
    else if (isTopOnly) {
      valueLabel = `label for specific value of "${value}"`
        + ` top count of "${topCountLabel}" available in the previous element`
    }
    else if (isBottomOnly) {
      valueLabel = `label for specific value of "${value}"`
        + ` bottom count of "${bottomCountLabel}" available in the following element`;
    }

    return valueLabel;
  }

  // Render
  return (
    <div
      className={gridContainerStyles}
      aria-label={chartLabel.toLowerCase()}
    >
      <TopCount
        label={topCountLabel}
        ariaLabel={
          `top count label "${topCountLabel}";`
          + `a top count column will cover 100% of the possible area with a count of ${highestCount}`.toLowerCase()
        }
      />
      <Value
        label={valueLabel}
        ariaLabel={`value label "${valueLabel}"`.toLowerCase()}
      />
      <BottomCount
        label={bottomCountLabel}
        ariaLabel={
          `bottom count label "${bottomCountLabel}";`
          + `a bottom count column will cover 100% of the possible area with a count of ${highestCount}`.toLowerCase()
        }
      />
      {orderedCountsAtValues.map(({
        value,
        topCount = 0,
        bottomCount = 0,
      }) => (
        <Fragment key={`CountsForValuesChart--for-${value}`}>
          <TopCount
            value={value}
            count={isTopOnly || isTopAndBottom ? topCount: undefined}
            countCeiling={highestCount}
            countLabel={topCountLabel}
          />
          <Value
            value={value}
            ariaLabel={formValueLabel(value)}
          />
          <BottomCount
            value={value}
            count={isBottomOnly || isTopAndBottom ? bottomCount : undefined}
            countCeiling={highestCount}
            countLabel={bottomCountLabel}
          />
        </Fragment>
      ))}
    </div>
  );
}