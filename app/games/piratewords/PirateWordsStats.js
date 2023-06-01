import { getStats, updateStats } from "./PlayerStats";

import GAME_STATICS from './statics';

// ---- UTIL FUNCTIONS ----

function incrementCountAtKey(countObj, key) {
  countObj[key] = (countObj[key] || 0) + 1
  return countObj;
}

function addLossToStats(playerName, lossData) {
  return updateStats(playerName, GAME_STATICS.title, (curStats = {}) => {
    const newStats = {
      // set defaults at expected keys in case they don't exist
      losses: 0,
      lossesAtNumGuesses: {},
      missedWordCounts: {},
      incorrectGuessCounts: {},
      correctGuessCounts: {},
      // spread will override defaults if values/objects already exist
      ...curStats,
    };

    incrementCountAtKey(newStats, 'losses');
    incrementCountAtKey(newStats.lossesAtNumGuesses, lossData.numGuesses);
    incrementCountAtKey(newStats.missedWordCounts, lossData.wordToFind.toUpperCase());

    lossData.wrongLettersGuessed.toUpperCase().split('').forEach((wrongLetter) => {
      incrementCountAtKey(newStats.incorrectGuessCounts, wrongLetter);
    });

    if(lossData.correctLettersGuessed) {
      lossData.correctLettersGuessed.toUpperCase().split('').forEach((correctLetter) => {
        incrementCountAtKey(newStats.correctGuessCounts, correctLetter);
      });
    }

    return newStats;
  });
}

function addWinToStats(playerName, winData) {
  return updateStats(playerName, GAME_STATICS.title, (curStats = {}) => {
    const newStats = {
      // set defaults at expected keys in case they don't exist
      wins: 0,
      winsAtNumGuessesLeft: {},
      correctWordCounts: {},
      incorrectGuessCounts: {},
      correctGuessCounts: {},
      // spread will override defaults if values/objects already exist
      ...curStats,
    };

    incrementCountAtKey(newStats, 'wins');
    incrementCountAtKey(newStats.winsAtNumGuessesLeft, winData.numGuessesLeft);
    incrementCountAtKey(newStats.correctWordCounts, winData.wordFound.toUpperCase());

    if(winData.wrongLettersGuessed) {
      winData.wrongLettersGuessed.toUpperCase().split('').forEach(wrongLetter => {
        incrementCountAtKey(newStats.incorrectGuessCounts, wrongLetter);
      });
    }

    const uniqueCorrectLetters = new Set(winData.wordFound.toUpperCase().split(''));
    uniqueCorrectLetters.forEach(correctLetter => {
      incrementCountAtKey(newStats.correctGuessCounts, correctLetter);
    });

    return newStats;
});
}

// ---- VISUAL COMPONENT ----

export default function PirateWordsStats({ playerName, gameName }) {
  const stats = getStats(playerName, gameName);

  return (
    <>
      <h2>stats header</h2>
      <div>
        TODO: nicely display stats for {playerName}:
        <br />
        <pre>{JSON.stringify(stats, null, 2)}.</pre>
      </div>
    </>
  );
}

export {
  addLossToStats,
  addWinToStats,
};