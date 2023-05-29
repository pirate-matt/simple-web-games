import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import GameController from './GameController';
import PirateWordsGame from './PirateWordsGame';

// Superficial Game component with expected behavior accessible via data-testid's
function FauxGame({
  handleGameEnd,
  renderGameOver,
}) {
  const handleEndingGame = (clickEvent) => {
    handleGameEnd({});
  };

  if (renderGameOver) return (
    <div data-testid={FauxGame.gameOverTextId}>Game Over</div>
  );

  return (
    <button data-testid={FauxGame.endGameButtonId} onClick={handleEndingGame}>End Game</button>
  );
}
FauxGame.endGameButtonId = 'end-game';
FauxGame.gameOverTextId = 'game-over';

describe('TDD for GameController', () => {
  test('User cannot play the game until they enter a player name, after which they can play the game', async () => {
    const expectedPlayerName = 'piratematt';

    render(<GameController Game={PirateWordsGame} />);

    // assert we can't play game
    const aGameControlQuery = screen.queryByRole('button', { name: new RegExp(expectedPlayerName[0], 'i')});
    expect(aGameControlQuery).toBe(null);

    // enter player name
    const playerNameInput = screen.getByRole('textbox', { name: /enter player name/i });
    await userEvent.type(playerNameInput, expectedPlayerName);

    const setPlayerName = screen.getByRole('button', { name: /start your adventure/i });
    await userEvent.click(setPlayerName);

    // make sure game controller is aware of player name
    const playerName = screen.getByRole('status', { name: /playing as/i });
    expect(playerName.textContent.toLowerCase()).toBe(expectedPlayerName);

    // assert we can play game
    const aGameControl = screen.getByRole('button', { name: new RegExp(expectedPlayerName[0], 'i')});
    expect(aGameControl).toBeInTheDocument();
  });

  test('User not entering a player name is warned none of their scores or progress will be saved, before being allowed to play the game', async () => {
    const expectedPlayerName = 'p';

    render(<GameController Game={PirateWordsGame} />);

    // assert we can't play game
    const aGameControlQuery = screen.queryByRole('button', { name: new RegExp(expectedPlayerName[0], 'i')});
    expect(aGameControlQuery).toBe(null);

    // play without setting player name
    const firstSetPlayerName = screen.getByRole('button', { name: /start your adventure/i });
    await userEvent.click(firstSetPlayerName);

    // view warning
    const firstWarningMsg = screen.getByText(/no scores or progress will be saved/i);
    expect(firstWarningMsg).toBeInTheDocument();

    const firstYesContinueButton = screen.getByRole('button', { name: /i'm sure/i });
    const firstBackToSettingPlayerName = screen.getByRole('button', { name: /go back and set my player name/i });
    expect(firstYesContinueButton).toBeInTheDocument();
    expect(firstBackToSettingPlayerName).toBeInTheDocument();

    // make sure we can go back and set player name if we want
    await userEvent.click(firstBackToSettingPlayerName);

    const playerNameInput = screen.getByRole('textbox', { name: /enter player name/i });
    const secondSetPlayerName = screen.getByRole('button', { name: /start your adventure/i });
    expect(playerNameInput).toBeInTheDocument();
    expect(secondSetPlayerName).toBeInTheDocument();

    // play without setting player name (again)
    await userEvent.click(secondSetPlayerName);

    // view warning (again)
    const secondWarningMsg = screen.getByText(/no scores or progress will be saved/i);
    expect(secondWarningMsg).toBeInTheDocument();

    const secondYesContinueButton = screen.getByRole('button', { name: /i'm sure/i });
    const secondBackToSettingPlayerName = screen.getByRole('button', { name: /go back and set my player name/i });
    expect(secondYesContinueButton).toBeInTheDocument();
    expect(secondBackToSettingPlayerName).toBeInTheDocument();

    // this time choose to continue
    await userEvent.click(secondYesContinueButton);

    // assert we can play game (without a player name)
    const aGameControl = screen.getByRole('button', { name: new RegExp(expectedPlayerName[0], 'i')});
    expect(aGameControl).toBeInTheDocument();
  });

  test('User with entered player name can view stats after game end', async () => {
    const expectedPlayerName = 'piratematt';

    render(<GameController Game={FauxGame} />)

    // enter player name
    const playerNameInput = screen.getByRole('textbox', { name: /enter player name/i });
    await userEvent.type(playerNameInput, expectedPlayerName);

    const setPlayerName = screen.getByRole('button', { name: /start your adventure/i });
    await userEvent.click(setPlayerName);

    // End Faux Game
    const gameEndBtn = screen.getByTestId(FauxGame.endGameButtonId);
    await userEvent.click(gameEndBtn);

    // Make sure we can see stats and faux game over screen
    const stats = screen.getByText(/stats/i);  // @FUTURE: implement a better way to find stats
    expect(stats).toBeInTheDocument();

    const fauxEndGameMsg = screen.getByTestId(FauxGame.gameOverTextId);
    expect(fauxEndGameMsg).toBeInTheDocument();
  });

  test('User without player name cannot view stats after game end', async () => {
    render(<GameController Game={FauxGame} />)

    // play without setting player name
    const firstSetPlayerName = screen.getByRole('button', { name: /start your adventure/i });
    await userEvent.click(firstSetPlayerName);

    const yesContinueButton = screen.getByRole('button', { name: /i'm sure/i });
    await userEvent.click(yesContinueButton);

    // End Faux Game
    const gameEndBtn = screen.getByTestId(FauxGame.endGameButtonId);
    await userEvent.click(gameEndBtn);

    // Make sure we cannot see stats, but can the faux game over screen
    const stats = screen.queryByText(/stats/i);  // @FUTURE: implement a better way to find stats
    expect(stats).toBe(null);

    const fauxEndGameMsg = screen.getByTestId(FauxGame.gameOverTextId);
    expect(fauxEndGameMsg).toBeInTheDocument();
  });
});
