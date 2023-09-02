import reducer, {
  actions,
  buildInitialState,
  deepCopyState,
} from './PirateWordsGame.reducer';

describe('TDD for PirateWords Game Reducer', () => {
  test('expected actions are exported', () => {
    expect(actions).toMatchObject({
      guessLetter: 'guessLetter',
    });
  });

  test('initial state builds as expected', () => {
    const expectedWord = 'hello';

    expect(buildInitialState(expectedWord)).toMatchObject({
      wordToFind: expectedWord.toUpperCase(),
      guessableLetters: ['H', 'E', 'L', 'L', 'O'],
      lettersToFindSet: new Set(['H', 'E', 'L', 'O']),
      numGuessesLeft: 6, // @FUTURE: make this dynamic based on difficulty?
      guessedLettersSet: new Set(),
      isWin: false,
      isLoss: false,
    });
  });

  test('deep copy state util returns new instances of any state objects', () => {
    const initialState = buildInitialState('pirate');

    const copiedState = deepCopyState(initialState);

    for (const [key, value] of Object.entries(copiedState)) {
      // we can ignore any non-reference values
      if (typeof value === 'object') {
        try {
          expect(copiedState[key]).not.toBe(initialState[key]);
        }
        catch(err) {
          // Pattern props to: https://aartdenbraber.medium.com/custom-error-messages-with-jest-for-assertions-821c69e72389
          err.message = `state.${key} —> ${err.message}`;
          throw err;
        }
      }
    }
  });

  test('unknown action dispatched to reducer throws error', () => {
    const unexpectedAction = 'takeOverTheWorld';

    expect(actions).not.toHaveProperty(unexpectedAction);

    let expectedErr;

    try {
      reducer({}, { type: unexpectedAction });
    }
    catch(ex) {
      expectedErr = ex;
    }

    expect(expectedErr).not.toBeUndefined();
  });

  describe('Guess action outcomes', () => {
    const expectedWord = 'pirate';
    const initialState = buildInitialState(expectedWord);

    const expectedMiss = 'z';
    const oneMissFromLossState = {
      ...initialState,
      guessedLettersSet: new Set(['H', 'E', 'L', 'O', 'W', 'O']),
      numGuessesLeft: 1,
    };

    const expectedHit = 'p';
    const oneHitFromWinState = {  // Note: this is only setup to win if you use `expectedHit`
      ...initialState,
      guessedLettersSet: new Set(['I', 'R', 'A', 'T', 'E']),
    };

    test('missed guess, no loss', () => {
      const newState = reducer(initialState, {
        type: actions.guessLetter,
        letter: expectedMiss,
      });

      expect(newState).toMatchObject({
        ...initialState,
        numGuessesLeft: 5,
        guessedLettersSet: new Set(expectedMiss.toUpperCase()),
      });
    });

    test('missed guess, with loss', () => {
      const newState = reducer(oneMissFromLossState, {
        type: actions.guessLetter,
        letter: expectedMiss,
      });

      expect(newState).toMatchObject({
        ...oneMissFromLossState,
        numGuessesLeft: 0,
        guessedLettersSet: oneMissFromLossState.guessedLettersSet.add(expectedMiss.toUpperCase()),
        isLoss: true,
      });
    });

    test('guess hits, no win', () => {
      const newState = reducer(initialState, {
        type: actions.guessLetter,
        letter: expectedHit,
      });

      expect(newState).toMatchObject({
        ...initialState,
        guessedLettersSet: new Set(expectedHit.toUpperCase()),
      });
    });


    test('guess hits, with win', () => {
      const newState = reducer(oneHitFromWinState, {
        type: actions.guessLetter,
        letter: expectedHit,
      });

      expect(newState).toMatchObject({
        ...oneHitFromWinState,
        guessedLettersSet: oneHitFromWinState.guessedLettersSet.add(expectedHit.toUpperCase()),
        isWin: true,
      });
    });
  });
});