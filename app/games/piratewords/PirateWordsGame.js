'use client';

import { useState } from 'react';

import styles from './piratewords.module.css';

const guessableLetters = `abcdefghijklmnopqrstuvwxyz`.toUpperCase().split('');

export default function PirateWordsGame({ startingWord = 'hello' }) {
  const [guessedLetters, setGuessedLetters] = useState('');
  const [numGuessesLeft, setNumGuessesLeft] = useState(startingWord.length);

  const lettersToGuess = startingWord.split('');

  const handleGuess = (clickEvent) => {
    const letterButton = clickEvent.currentTarget;
    const letterGuessed = letterButton.dataset.letter;
    setGuessedLetters((curState) => curState + letterGuessed.toUpperCase());

    // TODO: don't decrement on correct guesses
    setNumGuessesLeft((curVal) => curVal - 1);
  };


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
      >
        {lettersToGuess.map((letterToGuess, index) => (
          <div
            key={`letter-to-guess--${index}`}
            aria-label="un-guessed letter"
            className={styles['unguessed-letter']}
          >
          </div>
        ))}
      </div>
      <div
        aria-label="Guessable Letters"
      >
        {guessableLetters.map((guessableLetter) => (
          <button
            key={`guessable-letter--${guessableLetter}`}
            data-letter={guessableLetter}
            className={styles['guessable-letter']}
            onClick={handleGuess}
            {...guessedLetters.includes(guessableLetter.toUpperCase()) ? {
              disabled: true,
            } : undefined}
          >
            {guessableLetter}
          </button>
        ))}
      </div>
    </>
  );
}