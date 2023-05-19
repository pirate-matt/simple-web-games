import { render, screen } from '@testing-library/react';

import PirateWordsPage from './PirateWords.page.js';

describe('PirateWords Page Tests', () => {
  test('Make sure you can return to the home page', () => {
    render(<PirateWordsPage />);

    const homePageLink = screen.getByText('Home').closest('a');

    expect(homePageLink).toHaveAttribute('href', '/');
  });
});
