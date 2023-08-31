import CountForValuesChart from '../../components/charts/CountsForValuesChart';

export default function ActiveDevPage() {
  const expectedTopOnly = {
    expectedOrderedCountsAtValues: [
      { value: 6, topCount: 1 },
      { value: 5              },
      { value: 4, topCount: 2 },
      { value: 3, topCount: 2 },
      { value: 2, topCount: 2 },
      { value: 1, topCount: 1 },
    ],
    expectedTopLabel: 'wins',
    expectedValueLabel: 'guesses left',
  };

  const expectedBottomOnly = {
    expectedOrderedCountsAtValues: [
      { value: 8, bottomCount: 1 },
      { value: 7                 },
      { value: 6, bottomCount: 0 },
      { value: 5                 },
      { value: 4, bottomCount: 5 },
      { value: 3                 },
      { value: 2, bottomCount: 2 },
      { value: 1, bottomCount: 1 },
    ],
    expectedValueLabel: 'letters left',
    expectedBottomLabel: 'losses',
  };

  const expectedTopAndBottom = {
    expectedOrderedCountsAtValues: [
      { value: 'A', topCount: 16, bottomCount: 8 },
      { value: 'B', topCount: 2,  bottomCount: 3 },
      { value: 'C', topCount: 2,  bottomCount: 4 },
      { value: 'D', topCount: 3,  bottomCount: 2 },
      { value: 'E', topCount: 16, bottomCount: 6 },
      { value: 'F', topCount: 1,  bottomCount: 3 },
      { value: 'G', topCount: 2,  bottomCount: 4 },
      { value: 'H', topCount: 1,  bottomCount: 2 },
      { value: 'I', topCount: 7,  bottomCount: 10 },
      { value: 'J',               bottomCount: 1 },
      { value: 'K', topCount: 0,  bottomCount: 1 },
      { value: 'L', topCount: 5,  bottomCount: 4 },
      { value: 'M', topCount: 1,  bottomCount: 6 },
      { value: 'N', topCount: 8,  bottomCount: 2 },
      { value: 'O', topCount: 5,  bottomCount: 9 },
      { value: 'P', topCount: 1,  bottomCount: 3 },
      { value: 'Q',               bottomCount: 1 },
      { value: 'R', topCount: 10, bottomCount: 10 },
      { value: 'S', topCount: 3,  bottomCount: 14 },
      { value: 'T', topCount: 8,  bottomCount: 12 },
      { value: 'U', topCount: 5,  bottomCount: 7 },
      { value: 'V', topCount: 3,  bottomCount: 0 },
      { value: 'W', topCount: 1,  bottomCount: 2 },
      { value: 'X',               bottomCount: 1 },
      { value: 'Y',               bottomCount: 1 },
      { value: 'Z' },
    ],
    expectedValueLabel: 'letter',
    expectedTopLabel: 'correctly guessed',
    expectedBottomLabel: 'incorrectly guessed',
  };

  return (
    <>
      <h3>Top Only</h3>
      <CountForValuesChart
        orderedCountsAtValues={expectedTopOnly.expectedOrderedCountsAtValues}
        valueLabel={expectedTopOnly.expectedValueLabel}
        topCountLabel={expectedTopOnly.expectedTopLabel}
      />

      <br />
      <br />
      <br />
      <br />

      <h3>Bottom Only</h3>
      <CountForValuesChart
        orderedCountsAtValues={expectedBottomOnly.expectedOrderedCountsAtValues}
        valueLabel={expectedBottomOnly.expectedValueLabel}
        bottomCountLabel={expectedBottomOnly.expectedBottomLabel}
      />

      <br />
      <br />
      <br />
      <br />

      <h3>Top and Bottom</h3>
      <CountForValuesChart
        orderedCountsAtValues={expectedTopAndBottom.expectedOrderedCountsAtValues}
        topCountLabel={expectedTopAndBottom.expectedTopLabel}
        valueLabel={expectedTopAndBottom.expectedValueLabel}
        bottomCountLabel={expectedTopAndBottom.expectedBottomLabel}
      />
    </>
  );
}