'use client';

import Link from 'next/link';
import { useReducer } from 'react';

import GAME_STATICS from './statics';

import reducer, { actions, buildInitialState } from './PirateWordsGame.reducer';

import styles from './piratewords.module.css';

const allLetters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
export default function PirateWordsGame({
  word,
  handleWin = () => {},
  handleLoss = () => {},
}) {
  const [gameState, dispatchGameAction] = useReducer(reducer, word, buildInitialState);

  const handleGuess = (clickEvent) => {
    const letterButton = clickEvent.currentTarget;
    const letterGuessed = letterButton.dataset.letter.toUpperCase();

    dispatchGameAction({
      type: actions.guessLetter,
      letter: letterGuessed,
    });
  };

  const handleRestart = () => {
    // @TODO: build a better restart... I suspect showing stats will naturally replace this
    window.location.href = '/games/piratewords';
  };

  const {
    wordToFind,
    guessableLetters,
    numGuessesLeft,
    guessedLettersSet,
    isWin,
    isLoss,
  } = gameState;

  if (!isWin && !isLoss) return (
    <>
      <div>
        <label id="guesses-left-label" htmlFor="guesses-left">Guesses Left:</label>
        <span
          id="guesses-left"
          role="status"
          aria-labelledby='guesses-left-label'
        >
          {numGuessesLeft}
        </span>
      </div>
      <div
        role="status"
        aria-label="correct letters and blank un-guessed letters"
        className={styles['letters-to-guess']}
      >
        {guessableLetters.map((letterToGuess, index) => {
          if (guessedLettersSet.has(letterToGuess)) return (
            <div
              key={`letter-to-guess--${index}`}
              aria-label={`found letter: ${letterToGuess.toLowerCase()}`}
              className={styles['letter-to-guess']}
            >
              {letterToGuess}
            </div>
          );

          return (
            <div
              key={`letter-to-guess--${index}`}
              aria-label="un-guessed letter"
              className={styles['letter-to-guess']}
            >
            </div>
          );
        })}
      </div>
      <div
        aria-label="Guessable Letters"
        className={styles['guessable-letters']}
      >
        {allLetters.map((letter) => (
          <button
            key={`guessable-letter--${letter}`}
            data-letter={letter}
            className={styles['guessable-letter']}
            onClick={handleGuess}
            {...guessedLettersSet.has(letter.toUpperCase()) ? {
              disabled: true,
            } : undefined}
          >
            {letter}
          </button>
        ))}
      </div>
    </>
  );

  if (isWin) {
    handleWin();

    return (
      <>
        <div>
          <h2
            role="alert"
            aria-label="game over: win"
          >
            Congratulations!
          </h2>
          <p>
            {'You correctly guessed the Captain\'s favorite word, '}<em>{wordToFind.toLowerCase()}</em>, with {numGuessesLeft} guess{numGuessesLeft > 1 ? 'es' : ''} to spare!
          </p>
          <p>
            The crew helps you off the plank, would you like <Link href="/games/piratewords" onClick={handleRestart}>continue your adventure with another game</Link>?
          </p>
          <hr />
        </div>
      </>
    );
  }

  if (isLoss) {
    handleLoss();

    let missedWordByNumLetters = wordToFind.split('').reduce(
      (accumulator, letterToFind) => {
        if (guessedLettersSet.has(letterToFind)) return accumulator - 1;

        return accumulator;
      },
      wordToFind.length,
    );

    return (
      <>
        <div>
          <h2
            role="alert"
            aria-label="game over: loss"
          >
            Game Over
          </h2>
          <p>
            Uh oh, you ran out of plank to walk 😢.
          </p>
          <p>
            {`You missed the Captain's favorite word by ${missedWordByNumLetters} letters.`}
          </p>
          <hr />
          <p>
            Would you like to <Link href="/games/piratewords" onClick={handleRestart}>restart your adventure on the high seas</Link>?
          </p>
        </div>
      </>
    );

  }

  return null; // TODO: Should never reach this? Maybe refactor to <GameWin> and <GameLoss> and default is playing?
}

// PirateWordsGame.renderStats = (playerName) => (
//   <PirateWordsStats playerName={playerName} gameName={GAME_STATICS.title} />
// );

PirateWordsGame.title = GAME_STATICS.title;