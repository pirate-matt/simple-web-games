import { render, screen } from '@testing-library/react';

import { getStats, setStats } from './PlayerStats';
import GAME_STATICS from './statics';

import PirateWordsStats, { addLossToStats, addWinToStats } from './PirateWordsStats';
import { STATIC_STATUS_PAGES } from 'next/dist/shared/lib/constants';

// ---- UTIL TESTS ----

describe('TDD for PirateWords Stats utils', () => {
  afterEach(() => {
    localStorage.clear();
  });

  // ---- Wins ----

  it('adds first win to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const winData = {
      won: true,
      wordFound: 'hello',
      wrongLettersGuessed: 'pirat',
      numGuessesLeft: 1,
    };
    const expectedStats = {
      wins: 1,
      winsAtNumGuessesLeft: {
        1: 1,
      },
      correctWordCounts: {
        HELLO: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1,
      },
      correctGuessCounts: {
        H: 1, E: 1, L: 1, O: 1,
      },
    };

    const updatesStatsFromAddWin = addWinToStats(expectedPlayer, winData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddWin).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  it('adds player stats correctly for win with no incorrect guesses', () => {
    const expectedPlayer = 'piratematt';
    const winData = {
      won: true,
      wordFound: 'hello',
      // wrongLettersGuessed: '', intentionally leaving this undefined
      numGuessesLeft: 1,
    };
    const expectedStats = {
      wins: 1,
      winsAtNumGuessesLeft: {
        1: 1,
      },
      correctWordCounts: {
        HELLO: 1,
      },
      incorrectGuessCounts: {},
      correctGuessCounts: {
        H: 1, E: 1, L: 1, O: 1,
      },
    };

    const updatesStatsFromAddWin = addWinToStats(expectedPlayer, winData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddWin).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  it('adds second win to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const startingStats = {
      wins: 1,
      winsAtNumGuessesLeft: {
        1: 1,
      },
      correctWordCounts: {
        HELLO: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1,
      },
      correctGuessCounts: {
        H: 1, E: 1, L: 1, O: 1,
      },
    };
    setStats(expectedPlayer, GAME_STATICS.title, startingStats);

    const winData = {
      won: true,
      wordFound: 'world',
      wrongLettersGuessed: 'he',
      numGuessesLeft: 4,
    };
    const expectedStats = {
      wins: 2,
      winsAtNumGuessesLeft: {
        1: 1,
        4: 1,
      },
      correctWordCounts: {
        HELLO: 1,
        WORLD: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, H: 1, E: 1,
      },
      correctGuessCounts: {
        H: 1, E: 1, L: 2, O: 2, W: 1, R: 1, D: 1,
      },
    };

    const updatesStatsFromWin = addWinToStats(expectedPlayer, winData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromWin).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  // NOTE: this is testing to make sure increments, etc are working as expected
  it('adds duplicate win to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const startingStats = {
      wins: 2,
      winsAtNumGuessesLeft: {
        1: 1,
        4: 1,
      },
      correctWordCounts: {
        HELLO: 1,
        WORLD: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, H: 1, E: 1,
      },
      correctGuessCounts: {
        H: 1, E: 1, L: 2, O: 2, W: 1, R: 1, D: 1,
      },
    };
    setStats(expectedPlayer, GAME_STATICS.title, startingStats);

    const winData = {
      won: true,
      wordFound: 'hello',
      wrongLettersGuessed: 'pirat',
      numGuessesLeft: 1,
    };
    const expectedStats = {
      wins: 3,
      winsAtNumGuessesLeft: {
        1: 2,
        4: 1,
      },
      correctWordCounts: {
        HELLO: 2,
        WORLD: 1,
      },
      incorrectGuessCounts: {
        P: 2, I: 2, R: 2, A: 2, T: 2, H: 1, E: 1,
      },
      correctGuessCounts: {
        H: 2, E: 2, L: 3, O: 3, W: 1, R: 1, D: 1,
      },
    };

    const updatesStatsFromWin = addWinToStats(expectedPlayer, winData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromWin).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  // ---- LOSSES ----

  it('adds first loss to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const lossData = {
      loss: true,
      wordToFind: 'hello',
      correctLettersGuessed: 'e',
      wrongLettersGuessed: 'piratm',
      numGuesses: 6,
    };
    const expectedStats = {
      losses: 1,
      lossesAtNumGuesses: {
        6: 1,
      },
      missedWordCounts: {
        HELLO: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, M: 1,
      },
      correctGuessCounts: {
        E: 1,
      },
    };

    const updatesStatsFromAddLoss = addLossToStats(expectedPlayer, lossData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddLoss).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  it('adds player stats correctly for loss with no correct guesses', () => {
    const expectedPlayer = 'piratematt';
    const lossData = {
      loss: true,
      wordToFind: 'world',
      // correctLettersGuessed: '',  // intentionally leaving this undefined
      wrongLettersGuessed: 'pirate',
      numGuesses: 6,
    };
    const expectedStats = {
      losses: 1,
      lossesAtNumGuesses: {
        6: 1,
      },
      missedWordCounts: {
        WORLD: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, E: 1,
      },
      correctGuessCounts: {},
    };

    const updatesStatsFromAddLoss = addLossToStats(expectedPlayer, lossData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddLoss).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  it('adds second loss to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const startingStats = {
      losses: 1,
      lossesAtNumGuesses: {
        6: 1,
      },
      missedWordCounts: {
        HELLO: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, M: 1,
      },
      correctGuessCounts: {
        E: 1,
      },
    };

    setStats(expectedPlayer, GAME_STATICS.title, startingStats);

    const lossData = {
      loss: true,
      wordToFind: 'pirate',
      correctLettersGuessed: 'er',
      wrongLettersGuessed: 'hlowds',
      numGuesses: 6,
    };

    const expectedStats = {
      losses: 2,
      lossesAtNumGuesses: {
        6: 2,
      },
      missedWordCounts: {
        HELLO: 1,
        PIRATE: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, M: 1, H: 1, L: 1, O: 1, W: 1, D: 1, S: 1,
      },
      correctGuessCounts: {
        E: 2,
        R: 1,
      },
    };

    const updatesStatsFromAddLoss = addLossToStats(expectedPlayer, lossData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddLoss).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });

  // NOTE: this is testing to make sure increments, etc are working as expected
  it('adds duplicate loss to the players stats for pirate words', () => {
    const expectedPlayer = 'piratematt';
    const startingStats = {
      losses: 2,
      lossesAtNumGuesses: {
        6: 2,
      },
      missedWordCounts: {
        HELLO: 1,
        PIRATE: 1,
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1, M: 1, H: 1, L: 1, O: 1, W: 1, D: 1, S: 1,
      },
      correctGuessCounts: {
        E: 2,
        R: 1,
      },
    };

    setStats(expectedPlayer, GAME_STATICS.title, startingStats);

    const lossData = {
      loss: true,
      wordToFind: 'hello',
      correctLettersGuessed: 'e',
      wrongLettersGuessed: 'piratm',
      numGuesses: 6,
    };
    const expectedStats = {
      losses: 3,
      lossesAtNumGuesses: {
        6: 3,
      },
      missedWordCounts: {
        HELLO: 2,
        PIRATE: 1,
      },
      incorrectGuessCounts: {
        P: 2, I: 2, R: 2, A: 2, T: 2, M: 2, H: 1, L: 1, O: 1, W: 1, D: 1, S: 1,
      },
      correctGuessCounts: {
        E: 3,
        R: 1,
      },
    };

    const updatesStatsFromAddLoss = addLossToStats(expectedPlayer, lossData);
    const updatedStatsFromStorage = getStats(expectedPlayer, GAME_STATICS.title);

    expect(updatesStatsFromAddLoss).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });
});

// ---- VISUAL COMPONENT TESTS ----

describe('TDD for PirateWords Stats display component', () => {
  const expectedPlayer = 'piratematt';
  const expectedGame = 'PirateWords';
  const expectedStats = {
    wins: 42,
    losses: 39,
  };

  beforeEach(() => {
    setStats(expectedPlayer, expectedGame, expectedStats);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('display stats header', () => {
    render(<PirateWordsStats playerName={expectedPlayer} gameName={expectedGame} />);

    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toMatch(expectedPlayer);
    expect(header.textContent).toMatch(expectedGame);
  });

  test('display win %', () => {
    // const expectedPlayer = 'piratematt';
    // const expectedGame = 'PirateWords';
    // const playerGameStats = {
    //   wins: 4,
    //   losses: 2,
    // };
    // const expectedWinPercentage = `${Math.round(
    //   playerGameStats.wins / (playerGameStats.wins + playerGameStats.losses)
    // )}%`;

    // setStats(expectedPlayer, expectedGame, playerGameStats);

    // render(<PirateWordsStats playerName={expectedPlayer} gameName={expectedGame} />);

    // const winPercentage = screen.getByLabelText(/win percentage/i);
    // expect(winPercentage.textContent).toBe(expectedWinPercentage);
  });

  test('display win word cloud', () => {});
  test('display loss word cloud', () => {});
  test('display wins and losses at num guesses', () => {});
  test('display correct and incorrect letter guess counts', () => {});
});