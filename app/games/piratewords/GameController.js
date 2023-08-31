'use client';

import { useState } from 'react';

import PlayerStats, { nameGameJoinChar } from './PlayerStats';

// @FUTURE: genericize this to handle any game across the board

export function SetPlayerName({ handlePlayerName }) {
  const [playerName, setPlayerName] = useState('');
  const [renderIllegalCharWarning, setRenderIllegalCharWarning] = useState(false);
  const [renderNoPlayerNameWarning, setRenderNoPlayerNameWarning] = useState(false);

  const handlePlayerNameChange = (changeEvent) => {
    let newPlayerName = changeEvent.target.value;

    if (newPlayerName.indexOf(nameGameJoinChar) >= 0) {
      setRenderIllegalCharWarning(true);
      newPlayerName = newPlayerName.replace(new RegExp(nameGameJoinChar, 'g'), ' ');
    }
    else {
      setRenderIllegalCharWarning(false);
    }

    setPlayerName(newPlayerName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playerName === '') return setRenderNoPlayerNameWarning(true);

    handlePlayerName(playerName);
  };

  const handleNamelessContinue = (clickEvent) => {
    handlePlayerName(playerName);
  };

  const handleGoBackAndSetPlayerName = (clickEvent) => {
    setRenderNoPlayerNameWarning(false);
  };

  if (renderNoPlayerNameWarning) return (
    <>
      <p>{"Are you sure you don't want to set a player name?"}</p>
      <p>Without a player name, no scores or progress will be saved.</p>
      <div>
        <button onClick={handleNamelessContinue}>{"I'm sure, take me to my adventure!"}</button>
        <button onClick={handleGoBackAndSetPlayerName}>{"I'd like to go back and set my player name."}</button>
      </div>
    </>
  );

  return (
    <>
      <p>Before you set off on your high seas adventure with pirates, what shall we call you?</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="player-name">Enter player name: </label>
          <input
            id="player-name"
            type="text"
            value={playerName}
            onChange={handlePlayerNameChange}
          ></input>
        </div>
        {renderIllegalCharWarning  && (
          <div
            role="alert"
            aria-label={`Sorry, you cannot use the "${nameGameJoinChar}" character in your player name.`}
          >
            {`Sorry, you cannot use the "${nameGameJoinChar}" character in your player name.`}
          </div>
        )}
        <div>
          <input type="submit" value="Start your adventure!" />
        </div>
      </form>
    </>
  );
}

function PlayingAs({ playerName }) {
  return (
    <div>
      <label id="playing-as">Playing as: </label>
      <span
        aria-labelledby="playing-as"
        role="status"
      >
        {playerName}
      </span>
    </div>
  );
}

export default function GameController({ Game }) {
  const [capturingPlayerName, setCapturingPlayerName] = useState(true);
  const [playingGame, setPlayingGame] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [endGameData, setEndGameData] = useState({});

  const handlePlayerName = (newPlayerName) => {
    setPlayerName(newPlayerName);
    setCapturingPlayerName(false);
    setPlayingGame(true);
  };

  const handleGameEnd = (gameEndData) => {
    setPlayingGame(false);
    setEndGameData(gameEndData);
  };

  if (capturingPlayerName) return (
    <SetPlayerName handlePlayerName={handlePlayerName} />
  );

  if (playingGame) return (
    <>
      {playerName !== '' && <PlayingAs playerName={playerName} />}
      <Game playerName={playerName} handleGameEnd={handleGameEnd} />
    </>
  );

  return (
    <>
      <Game playerName={playerName} renderGameOver endGameData={endGameData} />
      <PlayerStats Game={Game} playerName={playerName} />
    </>
  );
}