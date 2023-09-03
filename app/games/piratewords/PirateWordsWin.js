import Link from 'next/link';

export default function PirateWordsWin({ guessedWord, numGuessesLeft }) {
  const handleRestart = () => {
    // @TODO: build a better restart... I suspect showing stats will naturally replace this
    window.location.href = '/games/piratewords';
  };

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
          {'You correctly guessed the Captain\'s favorite word, '}
          <em>{guessedWord.toLowerCase()}</em>{', '}
          with {numGuessesLeft} guess{numGuessesLeft > 1 ? 'es' : ''} to spare!
        </p>
        <p>
          The crew helps you off the plank, would you like <Link href="/games/piratewords" onClick={handleRestart}>continue your adventure with another game</Link>?
        </p>
        <hr />
      </div>
    </>
  );
}