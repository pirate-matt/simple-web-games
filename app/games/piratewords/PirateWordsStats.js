import { getStats, updateStats } from "./PlayerStats";

import * as STATICS from './statics';

// ---- UTIL FUNCTIONS ----

function addWinToStats(playerName, winData) {
  return updateStats(playerName, STATICS.title, (curStats = {}) => ({
    ...curStats,
    wins: (curStats.wins === undefined ? 0 : curStats.wins) + 1,
  }));
}

// ---- VISUAL COMPONENT ----

export default function PirateWordsStats({ playerName, gameName }) {
  const stats = getStats(playerName, gameName);

  return (
    <div>
      TODO: nicely display stats for {playerName}: {JSON.stringify(stats)}.
    </div>
  );
}

export {
  addWinToStats,
};