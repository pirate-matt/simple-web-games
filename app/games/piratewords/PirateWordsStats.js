'use client';

import CountsForValues from "@/components/charts/CountsForValuesChart";
import { getStats, updateStats } from "./PlayerStats";

import GAME_STATICS from './statics';

import styles from './piratewords.module.css';
import WordCloudChart from "@/components/charts/WordCloudChart";

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

function calculateWinsAtNumGuessesGraphData(winsAtNumGuessesLeft) {
  const lowestNumGuessesLeft = 1;  // at 0 it'd be a loss, not a win
  const highestNumGuessesLeft = Math.max(
    ...Object.keys(winsAtNumGuessesLeft).map(Number)
  );
  const highestWinCount = Math.max(
    ...Object.values(winsAtNumGuessesLeft)
  );

  const orderedGraphData = [];

  // Using descending num guesses left order
  for(let numGuessesLeft = highestNumGuessesLeft; numGuessesLeft >= lowestNumGuessesLeft; numGuessesLeft--) {
    const winCount = winsAtNumGuessesLeft[numGuessesLeft];

    orderedGraphData.push({
      value: numGuessesLeft,
      topCount: winCount,
      topHeightPercentage: (winCount / highestWinCount) * 100,
    });
  }

  return orderedGraphData;
}

function calculateCorrectAndIncorrectGuessesAtEachLetter(correctGuessCounts, incorrectGuessCounts) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

  const largestCount = Math.max(
    ...Object.values(incorrectGuessCounts),
    ...Object.values(correctGuessCounts),
  );

  return alphabet.split('').reduce((accumulator, letter) => {
    const correctCount = correctGuessCounts[letter] || 0;
    const bottomCount = incorrectGuessCounts[letter] || 0;

    accumulator.push({
      value: letter,
      topCount: correctCount,
      topHeightPercentage: (correctCount / largestCount) * 100,
      bottomCount: bottomCount,
      bottomHeightPercentage: (bottomCount / largestCount) * 100,
    });

    return accumulator;
  }, []);
}

function calculateGameStats(stats = {}) {
  const {
    wins = 0,
    losses = 0,
    winsAtNumGuessesLeft = {},
    correctGuessCounts = {},
    incorrectGuessCounts = {},
  } = stats;

  const winPercentage = wins === 0 ? 0 : Math.round((
    wins / (wins + losses)
  ) * 100);

  const winsAtNumGuesses = calculateWinsAtNumGuessesGraphData(winsAtNumGuessesLeft);

  const correctAndIncorrectGuessesAtEachLetter = calculateCorrectAndIncorrectGuessesAtEachLetter(
    correctGuessCounts,
    incorrectGuessCounts,
  );

  return {
    ...stats,
    winPercentage,
    winsAtNumGuesses,
    correctAndIncorrectGuessesAtEachLetter,
  };
}

export default function PirateWordsStats({ playerName, gameName }) {
  if (typeof localStorage?.getItem !== 'function') return;

  const rawStats = getStats(playerName, gameName);
  const stats = calculateGameStats(rawStats);  // TODO: consider if this is worth only running once
  const {
    correctWordCounts,
    winPercentage,
    winsAtNumGuesses,
    correctAndIncorrectGuessesAtEachLetter,
  } = stats;

  return (
    <>
      <h2>{`${playerName}'s ${gameName} Stats`}</h2>
      <h3>
        <label htmlFor="win-percentage">Wins </label>
        <output id="win-percentage">{`${winPercentage}%`}</output>
      </h3>

      <br />

      <h3>Win counts</h3>
      <CountsForValues
        orderedCountsAtValues={winsAtNumGuesses}
        valueLabel="Guesses Left"
        topCountLabel="Wins"
      />

      <br />

      <h3>Correct & Incorrect Guesses</h3>
      <CountsForValues
        orderedCountsAtValues={correctAndIncorrectGuessesAtEachLetter}
        valueLabel="letter"
        topCountLabel="correctly guessed"
        bottomCountLabel="incorrectly guessed"
      />

      <br />

      <h3>Winning Words Cloud</h3>
      <WordCloudChart
        visualizingDescriptor="how frequently a word has been correctly guessed"
        chartLabel="correct"
        wordCountsByWord={correctWordCounts}
      />

    </>
  );
}

export {
  addLossToStats,
  addWinToStats,
};