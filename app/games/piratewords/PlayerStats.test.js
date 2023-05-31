import { getAllByText, render, screen } from '@testing-library/react';

import PirateWordsGame from './PirateWordsGame';

import PlayerStats, {
  clearStats,
  getStats,
  nameGameJoinChar,
  setStats,
  updateStats
} from './PlayerStats';

// ---- UTILS TESTS ----

describe('TDD for stats utilities', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('can set stats for a game+player', () => {
    const expectedGame = 'piratewords';
    const expectedPlayer = 'piratematt';
    const expectedGameData = {
      wins: 42,
      losses: 19,
    };

    setStats(expectedPlayer, expectedGame, expectedGameData);

    const gameData = localStorage.getItem(`${expectedPlayer}${nameGameJoinChar}${expectedGame}`);
    expect(gameData).toEqual(JSON.stringify(expectedGameData));
  });

  test('when getting stats and there are no stats, return undefined (not the default of null)', () => {
    const expectedPlayer = 'piratematt';
    const expectedGame = 'piratewords';

    const stats = getStats(expectedPlayer, expectedGame);

    expect(stats).not.toBe(null);
    expect(stats).toBe(undefined);
  });

  test('can get stats for a game+player', () => {
    const expectedPlayer = 'piratematt';
    const expectedGame = 'piratewords';
    const expectedStats = {
      wins: 42,
      losses: 19,
    };

    setStats(expectedPlayer, expectedGame, expectedStats);
    const stats = getStats(expectedPlayer, expectedGame);

    expect(stats).toEqual(expectedStats); // Note: expects object not string
  });

  test('can update stats for a game+player', () => {
    const expectedGame = 'piratewords';
    const expectedPlayer = 'piratematt';
    const originalGameData = {
      wins: 42,
      losses: 19,
    };
    const expectedUpdatedGamedData = {
      wins: originalGameData.wins + 1,
      losses: originalGameData.losses,
    };

    setStats(expectedPlayer, expectedGame, originalGameData);

    const updatedStats = updateStats(expectedPlayer, expectedGame, (curStats) => ({
      ...curStats,
      wins: curStats.wins + 1,
    }));

    // ensure updateStats returns the expected data
    expect(updatedStats).toEqual(expectedUpdatedGamedData);

    // ensure we can still get the expected data
    const storedUpdatedStats = getStats(expectedPlayer, expectedGame);
    expect(storedUpdatedStats).toEqual(expectedUpdatedGamedData);
  });

  test('can clear stats for a player+game', () => {
    const expectedName = 'piratematt';
    const expectedGame = 'PirateWords';
    const originalGameData = {
      wins: 0,
      losses: 42,
    };

    setStats(expectedName, expectedGame, originalGameData);

    clearStats(expectedName, expectedGame);

    const foundStats = getStats(expectedName, expectedGame);

    expect(foundStats).toBe(undefined);
  });

  test('can clear stats for a player (all games)', () => {
    const expectedName = 'piratematt';
    const firstGame = 'PirateWords';
    const secondGame = 'DogWords';
    const firstGameData = {
      wins: 0,
      losses: 42,
    };
    const secondGameData = {
      wins: 9,
      losses: 6,
    };

    setStats(expectedName, firstGame, firstGameData);
    setStats(expectedName, secondGame, secondGameData);

    clearStats(expectedName);

    const firstGameStats = getStats(expectedName, firstGame);
    const secondGameStats = getStats(expectedName, secondGame);

    expect(firstGameStats).toBe(undefined);
    expect(secondGameStats).toBe(undefined);
  });
});

// ---- PlayerStats COMPONENT TESTS ----

describe('TDD for PlayerStats component', () => {
  test('If no/empty player name is specified, render nothing', () => {
    const noPlayerNameRender = render(<PlayerStats />);
    expect(noPlayerNameRender.container).toBeEmptyDOMElement();

    const emptyPlayerNameRender = render(<PlayerStats playerName={''} />);
    expect(emptyPlayerNameRender.container).toBeEmptyDOMElement();
  });

  test('Games without a renderStats method render a message informing the user stats are not yet available for this game', () => {
    const expectedPlayer = 'piratematt';
    const FauxGame = () => (<div>Faux Game</div>);

    render(<PlayerStats playerName={expectedPlayer} Game={FauxGame} />);

    const statsUnavailableMsg = screen.getByText(/stats are not yet available/i);
    expect(statsUnavailableMsg).toBeInTheDocument();
  });

  test('leverage Game component stats render for specific game results', () => {
    const expectedPlayer = 'piratematt';
    const renderStatsSpy = jest.fn();
    const FauxGame = () => (<div>Faux Game</div>);
    FauxGame.renderStats = renderStatsSpy;

    render(<PlayerStats playerName={expectedPlayer} Game={FauxGame} />)

    expect(renderStatsSpy).toHaveBeenCalledWith(expectedPlayer);
  });

  test ('Use Game.title in header', () => {
    const expectedGameTitle = 'Faux Game: Master Code Test-first!';

    const FauxGame = () => (<div>Faux Game</div>);
    FauxGame.title = expectedGameTitle;

    render(<PlayerStats playerName="piratematt" Game={FauxGame} />);

    expect(screen.getByText(expectedGameTitle, {
      selector: 'h2',
      exact: false,
    })).toBeInTheDocument();
  });

  test ('Gracefully handle the absence of Game.title', () => {
    const expectedHeaderText = 'Stats';
    const FauxGame = () => (<div>Faux Game</div>);

    render(<PlayerStats playerName="piratematt" Game={FauxGame} />);

    expect(screen.queryByText(/undefined/i)).toBe(null);  // ensure no "undefined"s slip into the UI
    expect(screen.queryByText(FauxGame.name, { exact: false })).toBe(null);  // ensure none of the old pattern has escaped refactoring

    expect(screen.getByTestId(PlayerStats.headerId).textContent).toBe(expectedHeaderText)
  });
});