import Link from 'next/link';

import styles from './piratewords.module.css';

const metadata = {
  title: 'Pirate Words',
};

const guessableLetters = `abcdefghijklmnopqrstuvwxyz`.split('');

export default function Page({ wordToGuess = 'hello' }) {

  return (
    <>
      <main>
        <h1>Pirate Words</h1>
        <div>TODO: build progress section</div>
        <div
          role="status"
          aria-label="correct letters and blank un-guessed letters"
        >
          {wordToGuess.split('').map((letterToGuess, index) => (
            <div
              key={`letter-to-guess--${index}`}
              aria-label="un-guessed letter"
              className={styles['unguessed-letter']}
            >
            </div>
          ))}
        </div>
        <div>
          {guessableLetters.map((guessableLetter) => (
            <button
              key={`guessable-letter--${guessableLetter}`}
              data-letter={guessableLetter}
              className={styles['guessable-letter']}
            >
              {guessableLetter}
            </button>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        Take me <Link href="/">Home</Link>!
      </footer>
    </>
  )
};

export {
  metadata,
};