import { render, screen } from '@testing-library/react';

import HomePage from './Home.page';

describe('TDDing Home Page', () => {

  test('Can play PirateWords', () => {
    render(<HomePage />);
    const pirateWordsNav = screen.getByRole('link', { name: /guess words with pirates/i });
    expect(pirateWordsNav).toBeInTheDocument();
  });
});