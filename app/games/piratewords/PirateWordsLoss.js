import Link from 'next/link';

export default function PirateWordsLoss({ missedWord, guessedLettersSet }) {
  const handleRestart = () => {
    // @TODO: build a better restart... I suspect showing stats will naturally replace this
    window.location.href = '/games/piratewords';
  };

  const missedWordByNumLetters = missedWord.toUpperCase().split('').reduce(
    (accumulator, letterToFind) => {
      if (guessedLettersSet.has(letterToFind)) return accumulator - 1;

      return accumulator;
    },
    missedWord.length,
  );

  return (
    <>
      <div>
        <h2 role="alert" aria-label="game over: loss">
          Game Over
        </h2>
        <p>Uh oh, you ran out of plank to walk 😢.</p>
        <p>
          You missed the {"Captain's"} favorite word by{' '}
          <span data-testid="missed-by-num-letters">{missedWordByNumLetters}</span>{' '}
          letters.
        </p>
        <hr />
        <p>
          Would you like to{' '}
          <Link href="/games/piratewords" onClick={handleRestart}>
            restart your adventure on the high seas
          </Link>
          ?
        </p>
      </div>
    </>
  );
}