'use client';

import { useReducer } from 'react';

import GAME_STATICS from './statics';

import reducer, { actions, buildInitialState } from './PirateWordsGame.reducer';

import PirateWordsLoss from './PirateWordsLoss';
import PirateWordsWin from './PirateWordsWin';

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

  const {
    wordToFind,
    guessableLetters,
    numGuessesLeft,
    guessedLettersSet,
    isWin,
    isLoss,
  } = gameState;

  if (isLoss) {
    handleLoss();
    return (<PirateWordsLoss missedWord={wordToFind} guessedLettersSet={guessedLettersSet} />);
  }

  if (isWin) {
    handleWin();
    return (<PirateWordsWin guessedWord={wordToFind} />);
  }

  return (
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
}

PirateWordsGame.title = GAME_STATICS.title;