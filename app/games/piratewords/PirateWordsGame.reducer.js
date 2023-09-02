export const actions = {
  guessLetter: 'guessLetter',
};

export const buildInitialState = (initialWord) => {
  const wordToFind = initialWord.toUpperCase();

  return {
    wordToFind,
    guessableLetters: wordToFind.split(''),
    lettersToFindSet: new Set(wordToFind.split('')),
    numGuessesLeft: 6, // @FUTURE: make this dynamic based on difficulty?
    guessedLettersSet: new Set(),
    isWin: false,
    isLoss: false,
  };
};

export const deepCopyState = (state) => ({
  ...state,
  guessableLetters: [...state.guessableLetters],
  lettersToFindSet: new Set(state.lettersToFindSet),
  guessedLettersSet: new Set(state.guessedLettersSet),
});

export default function reducer(gameState, { type, letter }) {
  if (type === actions.guessLetter) {
    const newGameState = deepCopyState(gameState);
    const { guessedLettersSet, lettersToFindSet } = newGameState;

    const guessedLetter = letter.toUpperCase();

    // Record letter guess
    guessedLettersSet.add(guessedLetter);

    // If miss take a step on the plank and check for loss
    if (!lettersToFindSet.has(guessedLetter)) {
      newGameState.numGuessesLeft -= 1;

      if (newGameState.numGuessesLeft === 0) newGameState.isLoss = true;
    }
    // else check for win
    else {
      let isWin = true;

      for (const letterToFind of lettersToFindSet) {
        if (!guessedLettersSet.has(letterToFind)) {
          isWin = false;
          break;
        }
      }

      newGameState.isWin = isWin;
    }

    return newGameState;
  }

  throw new Error(`Unsupported PirateWords action type: "${type}"`);
}