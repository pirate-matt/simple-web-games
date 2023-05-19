import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import PirateWordsGame from './PirateWordsGame.js';

describe('TDD for PirateWordsGame', () => {
  test('`Make sure user can see how many guesses they have left at the start of the game', () => {
    const expectedWord = 'Arrrrrrrrrg';
    const expectedNumLettersToGuess = expectedWord.length;

    render(<PirateWordsGame startingWord={expectedWord} />);

    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });

    expect(progressIndicator.textContent).toBe(expectedNumLettersToGuess.toString());
  });

  test('Make sure user can see how many letters they need to guess at the start of the game', () => {
    const expectedWord = 'Arrrrrrrrrg';
    const expectedNumLettersToGuess = expectedWord.length;

    render(<PirateWordsGame startingWord={expectedWord} />);

    const guessSection = screen.getByRole('status', { name: 'correct letters and blank un-guessed letters' });

    expect(guessSection).toBeInTheDocument();

    const lettersToGuess = within(guessSection).getAllByLabelText('un-guessed letter');

    expect(lettersToGuess.length).toBe(expectedNumLettersToGuess);
  });

  test.each('abcdefghijklmnopqrstuvwxyz'.split(''))('make sure user is able to click on each letter: %p to guess', (letterToGuess) => {
    render(<PirateWordsGame />);

    const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i')});

    userEvent.click(buttonForLetter);

    expect(buttonForLetter).toBeInTheDocument();

    // TODO: should I be asserting anything here?
  });

  test('when user guesses incorrect letter, letter is disabled and progress towards loss increases', async () => {
    const expectedWord = 'PIRATE';

    render(<PirateWordsGame startingWord={expectedWord} />);

    const wButton = screen.getByRole('button', { name: /W/i });
    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });
    const expectedGuessesLeft = Number(progressIndicator.textContent) - 1;

    await userEvent.click(wButton);


    expect(wButton).toHaveAttribute('disabled'); // cannot guess letter again
    expect(progressIndicator.textContent).toBe(expectedGuessesLeft.toString());
  });
});
