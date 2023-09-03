'use client';

import WORDS from './words';

import PirateWordsGame from './PirateWordsGame';

// TODO: cleanup comments in file

export const isNotValidWordForGame = (word) => (
  !word || word.search(/[^a-zA-Z]/) > -1
);

export const pickRandomWord = () => {
  return WORDS[
    Math.floor(Math.random() * WORDS.length)
  ];
};

export const calculateStartingWord = (word = '') => {
  while(isNotValidWordForGame(word)) {
    word = pickRandomWord();
  }

  return word;
};

export default function RandomPirateWordsGame() {
  const wordToFind = calculateStartingWord().toUpperCase();

  return (
    <PirateWordsGame word={wordToFind} />
  );
}

// RandomPirateWordsGame.title = GAME_STATICS.title;