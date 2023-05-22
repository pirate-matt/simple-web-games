'use client';

import { useState } from 'react';

import styles from './piratewords.module.css';

const guessableLetters = `abcdefghijklmnopqrstuvwxyz`.toUpperCase().split('');

export default function PirateWordsGame({ startingWord = 'hello' }) {
  const wordToFind = startingWord.toUpperCase();
  const [guessedLetters, setGuessedLetters] = useState('');
  const [numGuessesLeft, setNumGuessesLeft] = useState(startingWord.length);
  const [foundLetters, setFoundLetters] = useState('');

  const lettersToGuess = startingWord.toUpperCase().split('');

  const handleGuess = (clickEvent) => {
    const letterButton = clickEvent.currentTarget;
    const letterGuessed = letterButton.dataset.letter.toUpperCase();
    setGuessedLetters((curState) => curState + letterGuessed);

    if(wordToFind.includes(letterGuessed)) {
      setFoundLetters(curState => curState + letterGuessed);
      // TODO: check for win?
    }
    else {
      setNumGuessesLeft((curVal) => curVal - 1);
      // TODO: check for loss?
    }
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
        className={styles['letters-to-guess']}
      >
        {lettersToGuess.map((letterToGuess, index) => {
          if (foundLetters.includes(letterToGuess)) return (
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
          )
        })}
      </div>
      <div
        aria-label="Guessable Letters"
        className={styles['guessable-letters']}
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