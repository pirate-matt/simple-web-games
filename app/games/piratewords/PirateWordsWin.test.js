import { render, screen } from '@testing-library/react';

import PirateWordsWin from './PirateWordsWin';

export const assertWinIsRendered = () => {
  const winNotification = screen.getByRole('alert', { name: 'game over: win' });
  expect(winNotification).toBeInTheDocument();
};

describe('TDD for PirateWords win component', () => {
  test('alert is rendered informing user of win', () => {
    render(<PirateWordsWin guessedWord="WIN" />);

    assertWinIsRendered();
  });

  test('when user wins they are able to play another game', () => {
    render(<PirateWordsWin guessedWord="WIN" />);

    const restartGameBtn = screen.getByRole('link', { name: /another game/i});
    expect(restartGameBtn).toBeInTheDocument();
  });

  test('win renders the guessed word', () => {
    const expectedWord = 'WIN';

    render(<PirateWordsWin guessedWord={expectedWord} />);

    const guessedWord = screen.getByText(expectedWord.toLowerCase(), { exact: true });
    expect(guessedWord).toBeInTheDocument();
  });

  test('win renders multiple guesses left', () => {
    const expectedGuessesLeft = 4;

    render(<PirateWordsWin guessedWord="WIN" numGuessesLeft={expectedGuessesLeft} />);

    const pluralGuesses = screen.getByText(new RegExp(`\\b${expectedGuessesLeft} guesses\\b`));
    expect(pluralGuesses).toBeInTheDocument();
  });

  test('win renders 1 guess left', () => {
    const expectedGuessesLeft = 1;

    render(<PirateWordsWin guessedWord="WIN" numGuessesLeft={expectedGuessesLeft} />);

    const singularGuess = screen.getByText(new RegExp(`\\b${expectedGuessesLeft} guess\\b`));
    expect(singularGuess).toBeInTheDocument();
  });
});