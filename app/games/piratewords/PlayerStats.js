// ---- UTILS ----

const nameGameJoinChar = '—';
const buildStatsStorageKey = (playerName, gameName) => `${playerName}${nameGameJoinChar}${gameName}`;

function getStats(playerName, gameName) {
  const stats = JSON.parse(
    localStorage.getItem(buildStatsStorageKey(playerName, gameName))
  );

  if (stats === null) return undefined;
  return stats;
}

function setStats (playerName, gameName, gameData) {
  // TODO: handle JSON.stringify failures
  localStorage.setItem(buildStatsStorageKey(playerName, gameName), JSON.stringify(gameData));
}

function updateStats(playerName, gameName, updateFunc) {
  const updatedStats = updateFunc(getStats(playerName, gameName));
  setStats(playerName, gameName, updatedStats);
  return updatedStats;
}

function clearStats(playerName, gameName) {
  if (gameName !== undefined) {
    return localStorage.removeItem(buildStatsStorageKey(playerName, gameName));
  }

  let playerKeys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const potentialPlayerKey = localStorage.key(i);

    if (potentialPlayerKey.startsWith(playerName)) {
      playerKeys.push(potentialPlayerKey);
    }
  }

  playerKeys.forEach(playerKey => localStorage.removeItem(playerKey));
}

// ---- COMPONENT ----

export default function PlayerStats({
  Game,
  playerName = '',
}) {
  if (playerName === '') {
    return '';
  }

  const renderStats = typeof Game.renderStats === 'function' ? Game.renderStats : () => (
    <div>
      Sorry {playerName}, stats are not yet available for
      {Game.title === undefined ? ' this game' : ` ${Game.title}`}.
    </div>
  );

  return (
    <>
      <h2 data-testid={PlayerStats.headerId}>
        {Game.title === undefined ? '' : `${Game.title} `}Stats
      </h2>
      {renderStats(playerName)}
    </>
  );
}
PlayerStats.headerId = 'stats-header';

export {
  clearStats,
  getStats,
  nameGameJoinChar,
  setStats,
  updateStats,
};