import { render } from '@testing-library/react';

import WORDS from './words.js';

import { assertGameIsPlayable } from './PirateWordsGame.test.js';

import RandomPirateWordsGame, { calculateStartingWord, isNotValidWordForGame, pickRandomWord } from './RandomPirateWordsGame.js';

// ---- UTILS TESTS ----

describe('TDD for utils', () => {
  test('pickRandomWord pull random word from the hardcoded list', () => {
    const word = pickRandomWord();
    expect(WORDS).toContain(word);
  });

  test('isNotValidWordForGame returns true if word contains non alpha characters', () => {
    const illegalWords = [
      'aye-aye',
      'Captain Long John Silver',
      "crow's nest",
    ];

    illegalWords.forEach((illegalWord) => {
      expect(isNotValidWordForGame(illegalWord)).toBe(true);
    });
  });

  test('isNotValidWordForGame returns false if word is only alpha characters', () => {
    const legalWords = [
      'pirate',
      'hello',
      'world',
    ];

    legalWords.forEach((legalWord) => {
      expect(isNotValidWordForGame(legalWord)).toBe(false);
    });
  });

  test('calculateStartingWord pulls a random word from the hardcoded list', () => {
    const word = calculateStartingWord();
    expect(WORDS).toContain(word);
  });

  test('calculateStartingWord uses provided word if provided', () => {
    const expectedWord = 'hello';
    const word = calculateStartingWord(expectedWord);
    expect(word).toBe(expectedWord);
  });

  test('calculateStartingWord uses random word if provided word is illegal', () => {
    const expectedWord = 'hello-world';
    const word = calculateStartingWord(expectedWord);
    expect(WORDS).toContain(word);
  });
});

// ---- TESTS FOR GAME ----

// -- Test Suite --

describe('TDD for PirateWordsGame', () => {
  test('if a starting word is not provided, one is still set', () => {
    render(<RandomPirateWordsGame />);

    assertGameIsPlayable();
  });

  // TODO: Will I need a test to assert handleGameEnd is passed + invoked?
  // test('when user runs out of guesses left the game ends', async () => {
  //   const handleGameEndSpy = jest.fn(() => {});

  //   render(<RandomPirateWordsGame startingWord="z" handleGameEnd={handleGameEndSpy} />);

  //   // Note: currently game is hardcoded to allow 6 guesses, if this is made smart, these guesses may need to be updated
  //   await Promise.all('abcdef'.split('').map((letterToGuess) => {
  //     const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
  //     return userEvent.click(buttonForLetter);
  //   }));

  //   expect(handleGameEndSpy).toHaveBeenCalled();
  // });
});