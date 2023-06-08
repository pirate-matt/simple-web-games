import { render, screen } from '@testing-library/react';

import CountsForValuesChart from './CountsForValuesChart';

describe('TDD for CountsForValues Chart', () => {
  const expectedTopOnly = {
    expectedOrderedCountsAtValues: [
      { value: 6, topCount: 1, },
      { value: 5,              },
      { value: 4, topCount: 2, },
      { value: 3, topCount: 2, },
      { value: 2, topCount: 2, },
      { value: 1, topCount: 1, },
    ],
    expectedTopCountLabel: 'wins',
    expectedValueLabel: 'guesses left',
  };

  const expectedBottomOnly = {
    expectedOrderedCountsAtValues: [
      { value: 8, bottomCount: 1, },
      { value: 7,                 },
      { value: 6, bottomCount: 0, },
      { value: 5,                 },
      { value: 4, bottomCount: 5, },
      { value: 3,                 },
      { value: 2, bottomCount: 2, },
      { value: 1, bottomCount: 1, }
    ],
    expectedValueLabel: 'letters left',
    expectedBottomCountLabel: 'losses',
  };

  const expectedTopAndBottom = {
    expectedOrderedCountsAtValues: [
      { value: 'a', topCount: 16, bottomCount: 8, },
      { value: 'b', topCount: 2,  bottomCount: 3, },
      { value: 'c', topCount: 2,  bottomCount: 4, },
      { value: 'd', topCount: 3,  bottomCount: 2, },
      { value: 'e', topCount: 16, bottomCount: 6, },
      { value: 'f', topCount: 1,  bottomCount: 3, },
      { value: 'g', topCount: 2,  bottomCount: 4, },
      { value: 'h', topCount: 1,  bottomCount: 2, },
      { value: 'i', topCount: 7,  bottomCount: 10, },
      { value: 'j',               bottomCount: 1, },
      { value: 'k', topCount: 0,  bottomCount: 1, },
      { value: 'l', topCount: 5,  bottomCount: 4, },
      { value: 'm', topCount: 1,  bottomCount: 6, },
      { value: 'n', topCount: 8,  bottomCount: 2, },
      { value: 'o', topCount: 5,  bottomCount: 9, },
      { value: 'p', topCount: 1,  bottomCount: 3, },
      { value: 'q',               bottomCount: 1, },
      { value: 'r', topCount: 10, bottomCount: 10, },
      { value: 's', topCount: 3,  bottomCount: 14, },
      { value: 't', topCount: 8,  bottomCount: 12, },
      { value: 'u', topCount: 5,  bottomCount: 7, },
      { value: 'v', topCount: 3,  bottomCount: 0, },
      { value: 'w', topCount: 1,  bottomCount: 2, },
      { value: 'x',               bottomCount: 1, },
      { value: 'y',               bottomCount: 1, },
      { value: 'z', },
    ],
    expectedValueLabel: 'letter',
    expectedTopCountLabel: 'correctly guessed',
    expectedBottomCountLabel: 'incorrectly guessed',
  };



  test('renders single chart: top only', () => {
    // const {
    //   expectedOrderedCountsAtValues,
    //   expectedValueLabel,
    //   expectedTopCountLabel,
    // } = expectedTopOnly;

    // render(
    //   <CountsForValuesChart
    //     orderedCountsAtValues={expectedOrderedCountsAtValues}
    //     valueLabel={expectedValueLabel}
    //     topCountLabel={expectedTopCountLabel}
    //   />
    // );

    // const valueLabel = screen.getByText(new RegExp(expectedValueLabel, 'i'));
    // expect(valueLabel).toBeInTheDocument();

    // const topCountLabel = screen.getByText(new RegExp(expectedValueLabel, 'i'));
    // expect(topCountLabel).toBeInTheDocument();

    // TODO: don't find bottom counts
  });

  test('renders single chart: bottom only', () => {

  });

  test('renders top and bottom charts', () => {
    const {
      expectedOrderedCountsAtValues,
      expectedValueLabel,
      expectedTopCountLabel,
      expectedBottomCountLabel,
    } = expectedTopAndBottom;

    render(
      <CountsForValuesChart
        orderedCountsAtValues={expectedOrderedCountsAtValues}
        valueLabel={expectedValueLabel}
        topCountLabel={expectedTopCountLabel}
        bottomCountLabel={expectedBottomCountLabel}
      />
    );

    const valueLabel = screen.getByText(new RegExp(expectedValueLabel, 'i'));
    expect(valueLabel).toBeInTheDocument();

    const topCountLabel = screen.getByText(new RegExp(expectedTopCountLabel, 'i'));
    expect(topCountLabel).toBeInTheDocument();

    const bottomCountLabel = screen.getByText(new RegExp(expectedBottomCountLabel, 'i'));
    expect(bottomCountLabel).toBeInTheDocument();
  });

  test('bars are read top-down, left-to-right by screen readers', () => {});
  test('accessibility label includes information about bar scale, layout (top, bottom, both charts), etc.', () => {});
  test(`each bar has accessibility information:
    * value the count is for,
    * what the top bar reads (count & percentage),
    * what the bottom bar reads (count & percentage),
    * etc.`, () => {});

  test('asdf', () => {});
  test('asdf', () => {});
  test('asdf', () => {});
  test('asdf', () => {});

});