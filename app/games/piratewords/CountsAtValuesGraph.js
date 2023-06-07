export default function CountsAtValuesGraph({
  countsAtValues = [],
  valueLabel,
  topCountLabel,
  bottomCountLabel,
}) {
  const flexBasis = `${100 / (countsAtValues.length + 1)}%`;  // plus 1 for labels
  const minWidth = '3em';
  const barWidth = '80%';

  return (
    <div style={{
      // maxWidth: '90vw',
      minWidth: '400px',
    }}>
      <div style={{
        height: '100px',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <div style={{
          flexBasis,
          minWidth,
          textAlign: 'end',
        }}>
          {topCountLabel}
        </div>
        {countsAtValues.map(({
          value,
          topCount,
          topHeightPercentage,
        }) => (
          <div
            key={`graph--counts-at-values--value-${value}--top-count`}
            style={{
              flexBasis,
              minWidth,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              width: barWidth,
              height: `${topHeightPercentage}px`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              background: 'lightgreen',
              color: 'green',
            }}>
              {topCount}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{
          flexBasis,
          minWidth,
          textAlign: 'end',
          borderTop: 'solid 1px darkgreen',
        }}>
          at {valueLabel}
        </div>
        {countsAtValues.map(({
          value,
        }) => (
          <div
            key={`graph--counts-at-values--value-${value}`}
            style={{
              flexBasis,
              minWidth,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: 'solid 1px darkgreen',
            }}
          >
            <div style={{
              width: barWidth,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        <div style={{
          flexBasis,
          minWidth,
          textAlign: 'end',
          borderTop: 'solid 1px darkred',
        }}>
          {bottomCountLabel}
        </div>
        {countsAtValues.map(({
          value,
          bottomCount,
          bottomHeightPercentage,
        }) => (
          <div
            key={`graph--counts-at-values--value-${value}--bottom-count`}
            style={{
              flexBasis,
              minWidth,
              borderTop: 'solid 1px darkred',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              width: barWidth,
              height: `${bottomHeightPercentage}px`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              background: 'lightcoral',
              color: 'darkred',
            }}>
              {bottomCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}