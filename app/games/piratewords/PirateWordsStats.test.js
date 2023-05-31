import { render, screen } from '@testing-library/react';

import { getStats, setStats } from './PlayerStats';
import * as STATICS from './statics';

import PirateWordsStats, { addLossToStats, addWinToStats } from './PirateWordsStats';

describe('TDD for PirateWords Stats utils', () => {
  afterEach(() => {
    localStorage.clear();
  });

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
      correctWordCounts: {
        hello: 1
      },
      incorrectGuessCounts: {
        P: 1, I: 1, R: 1, A: 1, T: 1
      },
      correctGuessCounts: {
        H: 1, E: 1, L: 1, O: 1
      },
    };

    const updatesStatsFromAddWin = addWinToStats(expectedPlayer, winData);
    const updatedStatsFromStorage = getStats(expectedPlayer, STATICS.title);

    expect(updatesStatsFromAddWin).toEqual(expectedStats);
    expect(updatedStatsFromStorage).toEqual(expectedStats);
  });
  it('adds second win to the players stats for pirate words', () => {});

  it('adds first loss to the players stats for pirate words', () => {});
  it('adds second loss to the players stats for pirate words', () => {});
});

describe('TDD for PirateWords Stats display component', () => {
  test('display win %', () => {
    const expectedPlayer = 'piratematt';
    const expectedGame = 'PirateWords';
    const playerGameStats = {
      wins: 4,
      losses: 2,
    };
    const expectedWinPercentage = `${Math.round(
      playerGameStats.wins / (playerGameStats.wins + playerGameStats.losses)
    )}%`;

    setStats(expectedPlayer, expectedGame, playerGameStats);

    render(<PirateWordsStats playerName={expectedPlayer} gameName={expectedGame} />);

    const winPercentage = screen.getByLabelText(/win percentage/i);
    expect(winPercentage.textContent).toBe(expectedWinPercentage);
  });
});