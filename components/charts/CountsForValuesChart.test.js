import { render, screen } from '@testing-library/react';

import CountsForValuesChart from './CountsForValuesChart';

describe('TDD for CountsForValues Chart', () => {

  // -- Expected Values --

  const expectedTopOnly = {
    expectedOrderedCountsAtValues: [
      { value: 6, topCount: 1 },
      { value: 5              },
      { value: 4, topCount: 2 },
      { value: 3, topCount: 2 },
      { value: 2, topCount: 2 },
      { value: 1, topCount: 1 },
    ],
    expectedTopCountLabel: 'wins',
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
    expectedBottomCountLabel: 'losses',
  };

  const expectedTopAndBottom = {
    expectedOrderedCountsAtValues: [
      { value: 'a', topCount: 16, bottomCount: 8 },
      { value: 'b', topCount: 2,  bottomCount: 3 },
      { value: 'c', topCount: 2,  bottomCount: 4 },
      { value: 'd', topCount: 3,  bottomCount: 2 },
      { value: 'e', topCount: 16, bottomCount: 6 },
      { value: 'f', topCount: 1,  bottomCount: 3 },
      { value: 'g', topCount: 2,  bottomCount: 4 },
      { value: 'h', topCount: 1,  bottomCount: 2 },
      { value: 'i', topCount: 7,  bottomCount: 10 },
      { value: 'j',               bottomCount: 1 },
      { value: 'k', topCount: 0,  bottomCount: 1 },
      { value: 'l', topCount: 5,  bottomCount: 4 },
      { value: 'm', topCount: 1,  bottomCount: 6 },
      { value: 'n', topCount: 8,  bottomCount: 2 },
      { value: 'o', topCount: 5,  bottomCount: 9 },
      { value: 'p', topCount: 1,  bottomCount: 3 },
      { value: 'q',               bottomCount: 1 },
      { value: 'r', topCount: 10, bottomCount: 10 },
      { value: 's', topCount: 3,  bottomCount: 14 },
      { value: 't', topCount: 8,  bottomCount: 12 },
      { value: 'u', topCount: 5,  bottomCount: 7 },
      { value: 'v', topCount: 3,  bottomCount: 0 },
      { value: 'w', topCount: 1,  bottomCount: 2 },
      { value: 'x',               bottomCount: 1 },
      { value: 'y',               bottomCount: 1 },
      { value: 'z' },
    ],
    expectedValueLabel: 'letter',
    expectedTopCountLabel: 'correctly guessed',
    expectedBottomCountLabel: 'incorrectly guessed',
  };

  // -- Top/Bottom/Both Render Tests --

  test('renders single chart: top only with accessible chart label and individual row labels', () => {
    const {
      expectedOrderedCountsAtValues,
      expectedValueLabel,
      expectedTopCountLabel,
    } = expectedTopOnly;

    const expectedMaxCount = Math.max(
      ...expectedOrderedCountsAtValues.reduce(
        (allCounts, { topCount, bottomCount }) => allCounts.concat([topCount, bottomCount]),
        [],
      ).filter(Number)
    );

    render(
      <CountsForValuesChart
        orderedCountsAtValues={expectedOrderedCountsAtValues}
        valueLabel={expectedValueLabel}
        topCountLabel={expectedTopCountLabel}
      />
    );

    const chart = screen.getByLabelText(
      'chart visualizing'
      + ` a count of "${expectedTopCountLabel}" with a column on top of each "${expectedValueLabel}"`
    );
    expect(chart).toBeInTheDocument();

    const topLabel = screen.getByLabelText(
      `top count label "${expectedTopCountLabel}";`
        + `a top count column will cover 100% of the possible area with a count of ${expectedMaxCount}`
    );
    expect(topLabel).toBeInTheDocument();

    const valueLabel = screen.getByLabelText(`value label "${expectedValueLabel}"`);
    expect(valueLabel).toBeInTheDocument();

    const expectedValues = expectedOrderedCountsAtValues.map(({ value }) => value);
    expectedValues.forEach((expectedValue) => {
      const valueColumn = screen.getByLabelText(
      `label for specific value of "${expectedValue}"`
        + ` top count of "${expectedTopCountLabel}" available in the previous element`
      );
      expect(valueColumn).toBeInTheDocument();
    });
  });

  test('renders single chart: bottom only with accessible chart label and individual row labels', () => {
    const {
      expectedOrderedCountsAtValues,
      expectedValueLabel,
      expectedBottomCountLabel,
    } = expectedBottomOnly;

    const expectedMaxCount = Math.max(
      ...expectedOrderedCountsAtValues.reduce(
        (allCounts, { topCount, bottomCount }) => allCounts.concat([topCount, bottomCount]),
        [],
      ).filter(Number)
    );

    render(
      <CountsForValuesChart
        orderedCountsAtValues={expectedOrderedCountsAtValues}
        valueLabel={expectedValueLabel}
        bottomCountLabel={expectedBottomCountLabel}
      />
    );

    const chart = screen.getByLabelText(
      'chart visualizing'
      + ` a count of "${expectedBottomCountLabel}" with a column on the bottom of each "${expectedValueLabel}"`
    );
    expect(chart).toBeInTheDocument();

    const valueLabel = screen.getByLabelText(`value label "${expectedValueLabel}"`);
    expect(valueLabel).toBeInTheDocument();

    const bottomLabel = screen.getByLabelText(
      `bottom count label "${expectedBottomCountLabel}";`
        + `a bottom count column will cover 100% of the possible area with a count of ${expectedMaxCount}`
    );
    expect(bottomLabel).toBeInTheDocument();

    const expectedValues = expectedOrderedCountsAtValues.map(({ value }) => value);
    expectedValues.forEach((expectedValue) => {
      const valueColumn = screen.getByLabelText(
      `label for specific value of "${expectedValue}"`
        + ` bottom count of "${expectedBottomCountLabel}" available in the following element`
      );
      expect(valueColumn).toBeInTheDocument();
    });
  });

  test('renders top and bottom charts with accessible chart label and individual row labels', () => {
    const {
      expectedOrderedCountsAtValues,
      expectedValueLabel,
      expectedTopCountLabel,
      expectedBottomCountLabel,
    } = expectedTopAndBottom;

    const expectedMaxCount = Math.max(
      ...expectedOrderedCountsAtValues.reduce(
        (allCounts, { topCount, bottomCount }) => allCounts.concat([topCount, bottomCount]),
        [],
      ).filter(Number)
    );

    render(
      <CountsForValuesChart
        orderedCountsAtValues={expectedOrderedCountsAtValues}
        valueLabel={expectedValueLabel}
        topCountLabel={expectedTopCountLabel}
        bottomCountLabel={expectedBottomCountLabel}
      />
    );

    const chart = screen.getByLabelText(
      'chart visualizing both'
      + ` a count of "${expectedTopCountLabel}" with a column on the top of each "${expectedValueLabel}",`
      + ` and a count of "${expectedBottomCountLabel}" with a column on the bottom of each "${expectedValueLabel}"`
    );
    expect(chart).toBeInTheDocument();

    const topLabel = screen.getByLabelText(
      `top count label "${expectedTopCountLabel}";`
        + `a top count column will cover 100% of the possible area with a count of ${expectedMaxCount}`
    );
    expect(topLabel).toBeInTheDocument();

    const valueLabel = screen.getByLabelText(`value label "${expectedValueLabel}"`);
    expect(valueLabel).toBeInTheDocument();

    const bottomLabel = screen.getByLabelText(
      `bottom count label "${expectedBottomCountLabel}";`
        + `a bottom count column will cover 100% of the possible area with a count of ${expectedMaxCount}`
    );
    expect(bottomLabel).toBeInTheDocument();

    const expectedValues = expectedOrderedCountsAtValues.map(({ value }) => value);
    expectedValues.forEach((expectedValue) => {
      const valueColumn = screen.getByLabelText(
      `label for specific value of "${expectedValue}"`
        + ` top count of "${expectedTopCountLabel}" available in the previous element`
        + ` and a bottom count of "${expectedBottomCountLabel}" available in the following element`
      );
      expect(valueColumn).toBeInTheDocument();
    });
  });

  test(
    `html structure is top count, then value, then bottom count (repeating) for best screen reader experience;
    each count element has accessibility information:
      * top or bottom count
      * value the count is for
      * size of the count and what the count is
      * how much (percentage) that count takes of available space`,
    () => {
      const {
        expectedOrderedCountsAtValues,
        expectedValueLabel,
        expectedTopCountLabel,
        expectedBottomCountLabel,
      } = {
        expectedOrderedCountsAtValues: [
          { value: 'first',     topCount: 8, bottomCount: 4 },
          { value: 'undefined'                              },
          { value: 'zeros',     topCount: 0, bottomCount: 0 },
        ],
        expectedValueLabel: 'test values',
        expectedTopCountLabel: 'top counts',
        expectedBottomCountLabel: 'bottom counts',
      };

      render(
        <CountsForValuesChart
          orderedCountsAtValues={expectedOrderedCountsAtValues}
          valueLabel={expectedValueLabel}
          topCountLabel={expectedTopCountLabel}
          bottomCountLabel={expectedBottomCountLabel}
        />
      );

      const chart = screen.getByLabelText(/chart visualizing both/i);
      expect(chart).toBeInTheDocument();

      const directDescendantDivs = chart.querySelectorAll(':scope > div');

      const [
        topLabelDiv, valueLabelDiv, bottomLabelDiv,
        firstTopCountDiv, firstValueDiv, firstBottomCountDiv,
        undefinedTopCountDiv, undefinedValueDiv, undefinedBottomCountDiv,
        zerosTopCountDiv, zerosValueDiv, zerosBottomCountDiv,
      ] = directDescendantDivs;

      expect(topLabelDiv).toHaveTextContent(new RegExp(new RegExp(expectedTopCountLabel, 'i')));
      expect(valueLabelDiv).toHaveTextContent(new RegExp(new RegExp(expectedValueLabel, 'i')));
      expect(bottomLabelDiv).toHaveTextContent(new RegExp(new RegExp(expectedBottomCountLabel, 'i')));

      // First Columns, value = "first"
      const firstTopCountLabel = firstTopCountDiv.getAttribute('aria-label');
      expect(firstTopCountLabel).toMatch(/top count/i);
      expect(firstTopCountLabel).toMatch(/for value "first"/i);
      expect(firstTopCountLabel).toMatch(/8 "top counts"/i);
      expect(firstTopCountLabel).toMatch(/100%/i);

      expect(firstValueDiv).toBeInTheDocument(); // value element labels content are checked in preceding tests

      const firstBottomCountLabel = firstBottomCountDiv.getAttribute('aria-label');
      expect(firstBottomCountLabel).toMatch(/bottom count/i);
      expect(firstBottomCountLabel).toMatch(/for value "first"/i);
      expect(firstBottomCountLabel).toMatch(/4 "bottom counts"/i);
      expect(firstBottomCountLabel).toMatch(/50%/i);

      // Second Columns, value = "undefined"
      const undefinedTopCountLabel = undefinedTopCountDiv.getAttribute('aria-label');
      expect(undefinedTopCountLabel).toMatch(/top count/i);
      expect(undefinedTopCountLabel).toMatch(/for value "undefined"/i);
      expect(undefinedTopCountLabel).toMatch(/0 "top counts"/i);
      expect(undefinedTopCountLabel).toMatch(/0%/i);

      expect(undefinedValueDiv).toBeInTheDocument(); // value element labels content are checked in preceding tests

      const undefinedBottomCountLabel = undefinedBottomCountDiv.getAttribute('aria-label');
      expect(undefinedBottomCountLabel).toMatch(/bottom count/i);
      expect(undefinedBottomCountLabel).toMatch(/for value "undefined"/i);
      expect(undefinedBottomCountLabel).toMatch(/0 "bottom counts"/i);
      expect(undefinedBottomCountLabel).toMatch(/0%/i);

      // Third Columns, value = "zeros"
      const zerosTopCountLabel = zerosTopCountDiv.getAttribute('aria-label');
      expect(zerosTopCountLabel).toMatch(/top count/i);
      expect(zerosTopCountLabel).toMatch(/for value "zeros"/i);
      expect(zerosTopCountLabel).toMatch(/0 "top counts"/i);
      expect(zerosTopCountLabel).toMatch(/0%/i);

      expect(zerosValueDiv).toBeInTheDocument(); // value element labels content are checked in preceding tests

      const zerosBottomCountLabel = zerosBottomCountDiv.getAttribute('aria-label');
      expect(zerosBottomCountLabel).toMatch(/bottom count/i);
      expect(zerosBottomCountLabel).toMatch(/for value "zeros"/i);
      expect(zerosBottomCountLabel).toMatch(/0 "bottom counts"/i);
      expect(zerosBottomCountLabel).toMatch(/0%/i);
    }
  );

  test('percentages are rounded to one decimal place (if needed)', () => {
    const {
      expectedOrderedCountsAtValues,
      expectedValueLabel,
      expectedTopCountLabel,
      expectedBottomCountLabel,
    } = {
      expectedOrderedCountsAtValues: [
        { value: 'no rounding, set scale', topCount: 100,      bottomCount: 100        },
        { value: 'needs rounded 1',        topCount: 42.12345, bottomCount: 6.99999999 },
        { value: 'needs rounded 2',        topCount: 12.00029, bottomCount: 0.00000983 },
        { value: 'no rounding',            topCount: 64,       bottomCount: 0          },
      ],
      expectedValueLabel: 'test values',
      expectedTopCountLabel: 'top counts',
      expectedBottomCountLabel: 'bottom counts',
    };

    render(
      <CountsForValuesChart
        orderedCountsAtValues={expectedOrderedCountsAtValues}
        valueLabel={expectedValueLabel}
        topCountLabel={expectedTopCountLabel}
        bottomCountLabel={expectedBottomCountLabel}
      />
    );

    const chart = screen.getByLabelText(/chart visualizing both/i);
    expect(chart).toBeInTheDocument();

    const directDescendantDivs = chart.querySelectorAll(':scope > div');

    const [
      topLabelDiv, valueLabelDiv, bottomLabelDiv,
      firstNoRoundingTopCountDiv, firstNoRoundingValueDiv, firstNoRoundingBottomCountDiv,
      firstRoundingTopCountDiv, firstRoundingValueDiv, firstRoundingBottomCountDiv,
      secondRoundingTopCountDiv, secondRoundingValueDiv, secondRoundingBottomCountDiv,
      secondNoRoundingTopCountDiv, secondNoRoundingValueDiv, secondNoRoundingBottomCountDiv,
    ] = directDescendantDivs;

    // Expect all label <div>s to be in the document
    [
      topLabelDiv, valueLabelDiv, bottomLabelDiv,
      firstNoRoundingValueDiv, firstRoundingValueDiv,
      secondRoundingValueDiv, secondNoRoundingValueDiv,
    ].forEach((labelDiv) => {
      expect(labelDiv).toBeInTheDocument();
    });

    const ensureCorrectRoundingString = (div, roundingStr) => {
      const roundingStrRegExp = new RegExp(roundingStr);
      const ariaLabel = div.getAttribute('aria-label');
      expect(ariaLabel).toMatch(roundingStrRegExp);
      expect(div).toHaveTextContent(new RegExp(roundingStrRegExp));
    };

    // No rounding
    ensureCorrectRoundingString(firstNoRoundingTopCountDiv, '100%');
    ensureCorrectRoundingString(firstNoRoundingBottomCountDiv, '100%');

    ensureCorrectRoundingString(secondNoRoundingTopCountDiv, '64%');
    ensureCorrectRoundingString(secondNoRoundingBottomCountDiv, '0%');

    // Rounding
    ensureCorrectRoundingString(firstRoundingTopCountDiv, '42.1%');
    ensureCorrectRoundingString(firstRoundingBottomCountDiv, '7.0%');

    ensureCorrectRoundingString(secondRoundingTopCountDiv, '12.0%');
    ensureCorrectRoundingString(secondRoundingBottomCountDiv, '0.0%');
  });
});