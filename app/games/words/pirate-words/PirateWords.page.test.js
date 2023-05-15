import { render, screen } from '@testing-library/react'

import PirateWordsPage from './PirateWords.page';

describe('TDD for PirateWords game', () => {
  test('page renders', () => {
    const { container } = render(<PirateWordsPage />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
