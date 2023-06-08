import { render, screen } from "@testing-library/react";

import WordCloudChart from "./WordCloudChart";

describe('TDD for WordCloud', () => {
  it('renders with no words', () => {
    const expectedCountLabel = 'correct';
    const expectedChartVisualizingDescriptor = 'how frequently a word has been "correctly guessed"'

    render(
      <WordCloudChart
        visualizingDescriptor={expectedChartVisualizingDescriptor}
        countLabel={expectedCountLabel}
      />
    );

    const chart = screen.getByLabelText(
      `chart visualizing ${expectedChartVisualizingDescriptor}`
      + ` by increasing the size of the word in proportion to it's "${expectedCountLabel}" count`
    );
    expect(chart).toBeInTheDocument();

    const emptyMsg = screen.getByText(/no words provided/i);
    expect(emptyMsg).toBeInTheDocument();
  });

  it('renders with one word', () => {});

  it('renders with multiple words', () => {});

  it('places the word elements in order in the DOM to make a better screen reader experience', () => {});
  it('randomizes the display order of words (not the DOM order)', () => {});
  it('sets font size proportional to frequency', () => {});
  it('leverages a min and max font size in calculations if provided', () => {});
});