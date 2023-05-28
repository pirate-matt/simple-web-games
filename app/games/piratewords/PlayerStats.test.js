import { render, screen } from '@testing-library/react';

import PirateWordsGame from './PirateWordsGame';

import PlayerStats from './PlayerStats';

describe('TDD for Player Stats', () => {
  test('superficial render test', () => {
    render(<PlayerStats playerName="piratematt" Game={PirateWordsGame} />);
  });
})