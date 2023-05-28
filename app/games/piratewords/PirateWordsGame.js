'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './piratewords.module.css';


const guessableLetters = `abcdefghijklmnopqrstuvwxyz`.toUpperCase().split('');

const calculateStartingGuesses = function calculateNumberGuessesLeft() {
  // TODO: make this smarter... maybe word dependent?
  return 6;
};

const GAME_STATUSES = {
  playing: 'PLAYING',
  won: 'WON',
  loss: 'LOSS',
};

export default function PirateWordsGame({
  startingWord = 'hello',
  renderGameOver = false,
  endGameData = {}
}) {
  const wordToFind = startingWord.toUpperCase();
  const lettersToGuess = wordToFind.split('');
  const numUniqueLettersToFind = (new Set(lettersToGuess)).size;

  const [guessedLetters, setGuessedLetters] = useState('');
  const [numGuessesLeft, setNumGuessesLeft] = useState(calculateStartingGuesses());
  const [foundLetters, setFoundLetters] = useState('');
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.playing);

  useEffect(() => {
    if (numGuessesLeft <= 0) {
      setGameStatus(GAME_STATUSES.loss);
    }
    else if (foundLetters.length === numUniqueLettersToFind) {
      setGameStatus(GAME_STATUSES.won);
    }
  }, [numGuessesLeft, foundLetters, setGameStatus, numUniqueLettersToFind]);


  const handleGuess = (clickEvent) => {
    const letterButton = clickEvent.currentTarget;
    const letterGuessed = letterButton.dataset.letter.toUpperCase();
    setGuessedLetters((curState) => curState + letterGuessed);

    // Note: a useEffect hook checks for win/loss
    if(wordToFind.includes(letterGuessed)) {
      setFoundLetters(curState => curState + letterGuessed);
    }
    else {
      setNumGuessesLeft((curVal) => curVal - 1);
    }
  };

  const handleRestart = () => {
    // @TODO: build a better restart... I suspect showing stats will naturally replace this
    window.location.href = "/games/piratewords";
  };

  if (!renderGameOver) return (
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

  if (endGameData.won === true) return (
    <>
      <div>
        <h2
          role="alert"
          aria-label="game over: win"
        >
          Congratulations!
        </h2>
        <p>
          {`You correctly guessed the Captain's favorite word, <em>${wordToFind.toLowerCase()}</em>, with ${numGuessesLeft} guess${numGuessesLeft > 1 ? 'es' : ''} to spare!`}
        </p>
        <p>
          The crew helps you off the plank, would you like <Link href="/games/piratewords" onClick={handleRestart}>continue your adventure with another game</Link>?
        </p>
        <hr />
      </div>
    </>
  );


  // default assume endGameData.loss === true
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
          {`You missed the Captain's favorite word by ${wordToFind.length - foundLetters.length} letters.`}
        </p>
        <hr />
        <p>
          Would you like to <Link href="/games/piratewords" onClick={handleRestart}>restart your adventure on the high seas</Link>?
        </p>
      </div>
    </>
  );
}