import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import PirateWordsGame from './PirateWordsGame.js';

const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz';

describe('TDD for PirateWordsGame', () => {
  test('Make sure user can see how many guesses they have left at the start of the game', () => {
    const expectedWord = 'Arrrrrrrrrg';
    const expectedNumLettersToGuess = 6; // Note: this is currently hardcoded, future versions of the game will likely make this dynamic

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

  test.each(alphabetAsString.split(''))('make sure user is able to click on each letter: %p to guess', async (letterToGuess) => {
    render(<PirateWordsGame startingWord={alphabetAsString}/>);

    const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i')});

    expect(buttonForLetter).toBeInTheDocument();

    await userEvent.click(buttonForLetter);

    // TODO: should I assert anything here?
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

  test('when user guesses correct letter, letter is disabled and all instances of letter are revealed', async () => {
    const expectedWord = 'Greetings';  // greetings has two "e"s, we should find both
    const expectedNumEFounds = 2;
    const expectedNumUnfound = expectedWord.length - expectedNumEFounds;

    render(<PirateWordsGame startingWord={expectedWord} />);

    const eButton = screen.getByRole('button', { name: /e/i });
    const progressIndicator = screen.getByRole('status', { name: /guesses left/i });
    const expectedGuessesLeft = progressIndicator.textContent;

    await userEvent.click(eButton);

    expect(eButton).toHaveAttribute('disabled'); // cannot guess letter again
    expect(progressIndicator.textContent).toBe(expectedGuessesLeft); // number of guesses left hasn't changed

    const guessSection = screen.getByRole('status', { name: 'correct letters and blank un-guessed letters' });
    const lettersLeftToGuess = within(guessSection).getAllByLabelText('un-guessed letter');
    const lettersFound = within(guessSection).getAllByLabelText('found letter: e');

    expect(lettersFound.length).toBe(expectedNumEFounds); // found 2 "e"s
    lettersFound.forEach((letterFound) => {
      expect(letterFound.textContent.toUpperCase()).toBe('E');
    });
    expect(lettersLeftToGuess.length).toBe(expectedNumUnfound); // still showing the other unguessed letters
  });

  test('when user runs out of guesses left the game ends', async () => {
    const handleGameEndSpy = jest.fn(() => {});

    render(<PirateWordsGame startingWord="z" handleGameEnd={handleGameEndSpy} />);

    // Note: currently game is hardcoded to allow 6 guesses, if this is made smart, these guesses may need to be updated
    await Promise.all('abcdef'.split('').map(async (letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      await userEvent.click(buttonForLetter);
    }));

    expect(handleGameEndSpy).toHaveBeenCalled();
  });

  test('when game is lost handleGameEnd is invoked with word to find, correct letters guessed, wrong letters guessed, and total number guesses', async () => {
    const handleGameEndSpy = jest.fn(() => {});
    const expectedWord = 'pirate'.toUpperCase();
    const expectedCorrectGuesses = 'rate'.toUpperCase();
    const expectedIncorrectGuesses = 'uvwxyz'.toUpperCase();
    const lettersToGuess = expectedCorrectGuesses + expectedIncorrectGuesses;

    render(<PirateWordsGame startingWord={expectedWord} handleGameEnd={handleGameEndSpy} />);

    // Note: currently game is hardcoded to allow 6 guesses, if this is made smart, these guesses may need to be updated
    await Promise.all(lettersToGuess.split('').map(async (letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      await userEvent.click(buttonForLetter);
    }));

    expect(handleGameEndSpy).toHaveBeenCalledWith({
      loss: true,
      wordToFind: expectedWord,
      correctLettersGuessed: expectedCorrectGuesses,
      wrongLettersGuessed: expectedIncorrectGuesses,
      numGuesses: 6, // Note: losses are currently hardcoded to 6, will likely make smarter in future
    });
  });

  test('when user loses they are able to try again', () => {
    const expectedEndGameData = {
      loss: true,
      wordToFind: 'piratematt',
      correctLettersGuessed: 'rate',
      wrongLettersGuessed: 'uvwxyz',  // Note: can derive num guesses to lost from this length
    }

    render(<PirateWordsGame renderGameOver endGameData={expectedEndGameData} />);

    const lossNotification = screen.getByRole('alert', { name: 'game over: loss' });
    expect(lossNotification).toBeInTheDocument();

    const restartGameBtn = screen.getByRole('link', { name: /restart/i})
    expect(restartGameBtn).toBeInTheDocument();
  });

  test('when user correctly guesses word the game ends', async () => {
    const handleGameEndSpy = jest.fn(() => {});
    const expectedWord = 'pirate';
    const uniqueCorrectLetters = new Set(expectedWord.split(''));

    render(<PirateWordsGame startingWord={expectedWord} handleGameEnd={handleGameEndSpy} />);

    await Promise.all(Array.from(uniqueCorrectLetters).map(async (letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      await userEvent.click(buttonForLetter);
    }));

    expect(handleGameEndSpy).toHaveBeenCalled();
  });

  test('when game is won handleGameEnd is invoked with word found, wrong letters guessed, and guesses left', async () => {
    const handleGameEndSpy = jest.fn(() => {});
    const expectedWord = 'pirate'.toUpperCase();
    const uniqueCorrectLetters = new Set(expectedWord.split(''));
    const expectedMissedLetters = 'xz'.toUpperCase();
    const lettersToGuess = [...expectedMissedLetters.split(''), ...Array.from(uniqueCorrectLetters)];

    render(<PirateWordsGame startingWord={expectedWord} handleGameEnd={handleGameEndSpy} />);

    await Promise.all(Array.from(lettersToGuess).map(async (letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      await userEvent.click(buttonForLetter);
    }));

    expect(handleGameEndSpy).toHaveBeenCalledWith({
      won: true,
      wordFound: expectedWord,
      wrongLettersGuessed: expectedMissedLetters,
      numGuessesLeft: 6 - expectedMissedLetters.length, // Note: 6 is currently a hardcoded limit... will likely make this smarter in the future
    });
  });

  test('when user wins they are able to try again', () => {
    const expectedEndGameData = {
      won: true,
      wordFound: 'piratematt',
      wrongLettersGuessed: 'xz',
      guessesLeft: 6 - 'xz'.length, // Note: 6 is currently a hardcoded limit... will likely make this smarter in the future
    }

    render(<PirateWordsGame renderGameOver endGameData={expectedEndGameData} />);

    const lossNotification = screen.getByRole('alert', { name: 'game over: win' });
    expect(lossNotification).toBeInTheDocument();

    const restartGameBtn = screen.getByRole('link', { name: /continue .* with another game/i})
    expect(restartGameBtn).toBeInTheDocument();
  });
});
