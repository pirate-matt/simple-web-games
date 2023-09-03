import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import { assertLossIsRendered } from './PirateWordsLoss.test.js';
import { assertWinIsRendered } from './PirateWordsWin.test.js';

import PirateWordsGame  from './PirateWordsGame.js';

const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz';

// ---- TESTS FOR GAME ----

// -- Common gets, finds, etc. --

const getGuessSection = () => screen.getByRole('status', {
  name: 'correct letters and blank un-guessed letters',
});

// Exporting so other pages can ascertain if this component rendered a playable game
export const assertGameIsPlayable = () => {
  const guessSection = getGuessSection();
  expect(guessSection).toBeInTheDocument();

  const lettersToGuess = within(guessSection).getAllByLabelText('un-guessed letter');
  expect(lettersToGuess.length).toBeGreaterThan(0);
};

// -- Test Suite --

describe('TDD for PirateWordsGame', () => {
  test('Make sure user can see how many guesses they have left at the start of the game', () => {
    const expectedWord = 'Arrrrrrrrrg';
    const expectedNumLettersToGuess = 6; // Note: this is currently hardcoded, future versions of the game will likely make this dynamic

    render(<PirateWordsGame word={expectedWord} />);

    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });

    expect(progressIndicator).toHaveTextContent(expectedNumLettersToGuess.toString());
  });

  test('Make sure user can see how many letters they need to guess at the start of the game', () => {
    const expectedWord = 'Arrrrrrrrrg';
    const expectedNumLettersToGuess = expectedWord.length;

    render(<PirateWordsGame word={expectedWord} />);

    const guessSection = getGuessSection();
    expect(guessSection).toBeInTheDocument();

    const lettersToGuess = within(guessSection).getAllByLabelText('un-guessed letter');
    expect(lettersToGuess.length).toBe(expectedNumLettersToGuess);
  });

  test.each(alphabetAsString.split(''))('make sure user is able to click on each letter: %p to guess', async (letterToGuess) => {
    render(<PirateWordsGame word={alphabetAsString}/>);

    const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i')});

    expect(buttonForLetter).toBeInTheDocument();

    await userEvent.click(buttonForLetter);

    // TODO: should I assert anything here?
  });

  test('when user guesses incorrect letter, letter is disabled and progress towards loss increases', async () => {
    const expectedWord = 'PIRATE';

    render(<PirateWordsGame word={expectedWord} />);

    const wButton = screen.getByRole('button', { name: /W/i });
    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });
    const expectedGuessesLeft = Number(progressIndicator.textContent) - 1;

    await userEvent.click(wButton);

    expect(wButton).toBeDisabled(); // cannot guess letter again
    expect(progressIndicator).toHaveTextContent(expectedGuessesLeft.toString());
  });

  test('when user guesses correct letter, letter is disabled and all instances of letter are revealed', async () => {
    const expectedWord = 'Greetings';  // greetings has two "e"s, we should find both
    const expectedNumEFounds = 2;
    const expectedNumUnfound = expectedWord.length - expectedNumEFounds;

    render(<PirateWordsGame word={expectedWord} />);

    const eButton = screen.getByRole('button', { name: /e/i });
    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });
    const expectedGuessesLeft = progressIndicator.textContent;

    await userEvent.click(eButton);

    expect(eButton).toBeDisabled(); // cannot guess letter again
    expect(progressIndicator).toHaveTextContent(expectedGuessesLeft); // number of guesses left hasn't changed

    const guessSection = getGuessSection();
    const lettersLeftToGuess = within(guessSection).getAllByLabelText('un-guessed letter');
    const lettersFound = within(guessSection).getAllByLabelText('found letter: e');

    expect(lettersFound.length).toBe(expectedNumEFounds); // found 2 "e"s
    lettersFound.forEach((letterFound) => {
      expect(letterFound.textContent.toUpperCase()).toBe('E');
    });
    expect(lettersLeftToGuess.length).toBe(expectedNumUnfound); // still showing the other unguessed letters
  });

  test('when user wins handleWin is invoked and win is rendered', async () => {
    const handleWinSpy = jest.fn(() => {});
    const expectedWord = 'pirate';

    render(<PirateWordsGame word={expectedWord} handleWin={handleWinSpy} />);

    await Promise.all(expectedWord.split('').map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
    }));

    expect(handleWinSpy).toHaveBeenCalled();

    assertWinIsRendered();
  });

  test('when user loses handleLoss is invoked and loss is rendered', async () => {
    const handleLossSpy = jest.fn(() => {});

    render(<PirateWordsGame word="z" handleLoss={handleLossSpy} />);

    // Note: currently game is hardcoded to allow 6 guesses, if this is made smart, these guesses may need to be updated
    await Promise.all('abcdef'.split('').map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
    }));

    expect(handleLossSpy).toHaveBeenCalled();

    assertLossIsRendered();
  });
});