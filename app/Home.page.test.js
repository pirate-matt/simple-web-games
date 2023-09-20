import { render, screen } from '@testing-library/react';

import HomePage, { metadata } from './Home.page';

describe('TDDing Home Page', () => {
  test('Page title is set as expected', () => {
    const expectedPageTitle = 'Simple Web Games';
    expect(metadata.title).toBe(expectedPageTitle);
  });

  test('Can play PirateWords', () => {
    render(<HomePage />);
    const pirateWordsNav = screen.getByRole('link', { name: /guess words with pirates/i });
    expect(pirateWordsNav).toBeInTheDocument();
  });
});