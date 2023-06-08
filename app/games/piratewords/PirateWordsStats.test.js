import { render, screen, within } from '@testing-library/react';

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
  const noStatsPlayer = 'rowin';
  const expectedGame = 'PirateWords';
  const expectedStats = {
    "wins": 11,
    "winsAtNumGuessesLeft": {
      "1": 4, "2": 2, "3": 2, "4": 2, "6": 1,
    },
    "correctWordCounts": {
      "THIEF": 1, "VILLAIN": 1, "TREASURE": 1, "WEAPONS": 1, "RAID": 1,
      "TRUCE": 1, "VIOLENT": 1, "LANDLUBBER": 1, "CANNON": 1, "ARMADA": 1,
      "BATTLE": 1,
    },
    "incorrectGuessCounts": {
      "A": 9, "B": 2, "C": 3, "E": 6, "F": 2, "G": 4, "H": 1, "I": 10,
      "K": 1, "L": 4, "M": 6, "N": 2, "O": 9, "P": 3, "Q": 1, "R": 10,
      "S": 14, "T": 12, "U": 7, "W": 2, "X": 1, "Y": 1,
    },
    "correctGuessCounts": {
      "A": 14, "B": 2, "C": 2, "D": 3, "E": 15, "F": 1, "G": 1, "H": 1,
      "I": 6, "L": 5, "M": 1, "N": 8, "O": 5, "P": 1, "R": 10, "S": 3,
      "T": 8, "U": 5, "V": 3, "W": 1,
    },
    "losses": 12,
    "lossesAtNumGuesses": {
      "6": 12,
    },
    "missedWordCounts": {
      "ROBBER": 1, "DISHONEST": 1, "DAGGER": 1, "DECK": 1, "LUCRE": 1,
      "NAVIGATE": 1, "PARLEY": 1, "VANDALIZE": 1, "UNLAWFUL": 1, "DARING": 1,
      "BOUNTY": 1, "WORLD": 1,
    }
  };

  beforeEach(() => {
    setStats(expectedPlayer, expectedGame, expectedStats);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('display stats header with player and game name', () => {
    render(<PirateWordsStats playerName={expectedPlayer} gameName={expectedGame} />);

    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toMatch(expectedPlayer);
    expect(header.textContent).toMatch(expectedGame);
  });

  test('display win %', () => {
    const expectedWinPercentage = '48%'; // 11 wins, 12 losses

    render(<PirateWordsStats playerName={expectedPlayer} gameName={expectedGame} />);

    const winHeading = screen.getByRole('heading', { level: 3, name: /wins/i });
    const winPercentage = within(winHeading).getByLabelText(/wins/i);
    expect(winPercentage.textContent).toBe(expectedWinPercentage);
  });

  test('win % handles no player with no game stats', () => {
    const expectedWinPercentage = '0%';

    render(<PirateWordsStats playerName={noStatsPlayer} gameName={expectedGame} />);

    const winHeading = screen.getByRole('heading', { level: 3, name: /wins/i });
    const winPercentage = within(winHeading).getByLabelText(/wins/i);
    expect(winPercentage.textContent).toBe(expectedWinPercentage);
  });

  test('display wins at num guesses', () => {
    render(<PirateWordsStats playerName={noStatsPlayer} gameName={expectedGame} />);

    const header = screen.getByRole('heading', { level: 3, name: /win counts/i });
    expect(header).toBeInTheDocument();

    const chart = screen.getByLabelText(`chart visualizing a count of "wins" with a column on top of each "guesses left"`);
    expect(chart).toBeInTheDocument();
  });


  test('display correct and incorrect letter guess counts', () => {
    render(<PirateWordsStats playerName={noStatsPlayer} gameName={expectedGame} />);

    const header = screen.getByRole('heading', { level: 3, name: /correct & incorrect guesses/i });
    expect(header).toBeInTheDocument();

    const chart = screen.getByLabelText(
      `chart visualizing both`
      + ` a count of "correctly guessed" with a column on the top of each "letter",`
      + ` and a count of "incorrectly guessed" with a column on the bottom of each "letter"`
    );
    expect(chart).toBeInTheDocument();
  });

  test('display wins word cloud', () => {
    render(<PirateWordsStats playerName={noStatsPlayer} gameName={expectedGame} />);

    const header = screen.getByRole('heading', { level: 3, name: /Wining Words Cloud/i });
    expect(header).toBeInTheDocument();

    const chart = screen.getByLabelText(
      `chart visualizing how frequently a word has been "correctly guessed"`
      + ` by increasing the size of the word in proportion to it's "correct" count`
    );
    expect(chart).toBeInTheDocument();
  });
});