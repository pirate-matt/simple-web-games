import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import { getStats } from './PlayerStats.js';
import GAME_STATICS from './statics.js';
import WORDS from './words.js';

import PirateWordsGame, { calculateStartingWord, isNotValidWordForGame, pickRandomWord } from './PirateWordsGame.js';

const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz';

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

describe('TDD for PirateWordsGame', () => {
  test('if a starting word is not provided, one is still set', () => {
    render(<PirateWordsGame />);

    const guessSection = screen.getByRole('status', { name: 'correct letters and blank un-guessed letters' });
    expect(guessSection).toBeInTheDocument();

    const lettersToGuess = within(guessSection).getAllByLabelText('un-guessed letter');
    expect(lettersToGuess.length).toBeGreaterThan(0);
  });

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
    await Promise.all('abcdef'.split('').map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
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
    await Promise.all(lettersToGuess.split('').map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
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

    await Promise.all(Array.from(uniqueCorrectLetters).map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
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

    await Promise.all(Array.from(lettersToGuess).map((letterToGuess) => {
      const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i') });
      return userEvent.click(buttonForLetter);
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

  test('ensure PirateWordsGame.renderStats is set for use with PlayerStats (and does not render nothing)', () => {
    const expectedPlayer = 'piratematt';

    const { container } = render(
      <>
        {PirateWordsGame.renderStats(expectedPlayer)}
      </>
    );

    expect(container).not.toBeEmptyDOMElement();
  });

  describe('Stats tests', () => {
    const expectedPlayer = 'piratematt';

    beforeAll(() => localStorage.clear());
    afterEach(() => localStorage.clear());

    test('ensure stats are not set when player name is not provided upon win', async () => {
      const expectedWord = 'hello';
      const lettersToWin = 'hello';

      render(<PirateWordsGame startingWord={expectedWord} />)

      await Promise.all(Array.from(lettersToWin).map((letter) => {
        const buttonForLetter = screen.getByRole('button', { name: new RegExp(letter, 'i') });
        return userEvent.click(buttonForLetter);
      }));

      expect(localStorage.length).toBe(0);  // NOTE: if we ever move away from localStorage this will need updated
    });

    test('ensure stats are not set when player name is not provided upon loss', async () => {
      const expectedWord = 'hello';
      const lettersToLose = 'abcdefg';

      render(<PirateWordsGame startingWord={expectedWord} />)

      await Promise.all(Array.from(lettersToLose).map((letter) => {
        const buttonForLetter = screen.getByRole('button', { name: new RegExp(letter, 'i') });
        return userEvent.click(buttonForLetter);
      }));

      expect(localStorage.length).toBe(0);  // NOTE: if we ever move away from localStorage this will need updated
    });

    test('ensure stats are stored upon win', async () => {
      const endGameSpy = jest.fn();
      const expectedWord = 'hello';
      const lettersToWin = 'hello';

      render(<PirateWordsGame playerName={expectedPlayer} startingWord={expectedWord} handleGameEnd={endGameSpy} />);

      await Promise.all(Array.from(lettersToWin).map((letter) => {
        const buttonForLetter = screen.getByRole('button', { name: new RegExp(letter, 'i') });
        return userEvent.click(buttonForLetter);
      }));

      await waitFor(() => { expect(endGameSpy).toHaveBeenCalled(); });

      const playerGameStats = getStats(expectedPlayer, PirateWordsGame.title);
      expect(playerGameStats.wins).toBe(1);
      // Note: We don't care about the specific stats, we're superficially checking "wins"
      //       because we want to make sure we're calling the right stats calculation methods,
      //       but ultimately don't care what else is in there. We have other tests for that.
    });

    test('ensure stats are stored upon loss', async () => {
      const endGameSpy = jest.fn();
      const expectedWord = 'hello';
      const lettersToLose = 'abcdefg';

      render(<PirateWordsGame playerName={expectedPlayer} startingWord={expectedWord} handleGameEnd={endGameSpy} />)

      await Promise.all(Array.from(lettersToLose).map((letter) => {
        const buttonForLetter = screen.getByRole('button', { name: new RegExp(letter, 'i') });
        return userEvent.click(buttonForLetter);
      }));

      await waitFor(() => { expect(endGameSpy).toHaveBeenCalled(); });

      const playerGameStats = getStats(expectedPlayer, PirateWordsGame.title);
      expect(playerGameStats.losses).toBe(1);
      // Note: We don't care about the specific stats, we're superficially checking "losses"
      //       because we want to make sure we're calling the right stats calculation methods,
      //       but ultimately don't care what else is in there. We have other tests for that.
    });
  });
});