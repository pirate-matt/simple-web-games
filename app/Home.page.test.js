import { render, screen } from '@testing-library/react'

import HomePage from './Home.page';

describe('You can navigate to games from the Home page', () => {
  test('You can access word games from the home page', () => {
    const wordGamesSubPath = '/games/words';

    render(<HomePage />);

    const pirateWordsLink = screen.getByRole('link', { name: /words.*pirate|pirate.*words/i });
    expect(pirateWordsLink).toHaveAttribute('href', `${wordGamesSubPath}/pirate-words`);  // keep this in sync with directory names
  });

  test('You can access Coding games from the home page', () => {
    const codingGamesSubPath = '/games/coding';

    render(<HomePage />);

    const pirateWordsLink = screen.getByRole('link', { name: /high.*seas.*JavaScript/i });
    expect(pirateWordsLink).toHaveAttribute('href', `${codingGamesSubPath}/the-high-seas-of-javascript`);  // keep this in sync with directory names
  });
});