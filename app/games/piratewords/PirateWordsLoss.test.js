import { render, screen } from '@testing-library/react';

import PirateWordsLoss from './PirateWordsLoss';

export const assertLossIsRendered = () => {
  const lossNotification = screen.getByRole('alert', { name: 'game over: loss' });
  expect(lossNotification).toBeInTheDocument();
};

describe('TDD for PirateWords loss component', () => {
  test('alert is rendered informing user of loss', async () => {
    render(<PirateWordsLoss missedWord="loss" guessedLettersSet={new Set()}/>);

    assertLossIsRendered();
  });

  test('when user loses they are able to try again', async () => {
    render(<PirateWordsLoss missedWord="loss" guessedLettersSet={new Set()}/>);

    const restartGameBtn = screen.getByRole('link', { name: /restart/i});
    expect(restartGameBtn).toBeInTheDocument();
  });

  test('Loss page correctly calculates NO correct guesses', () => {
    const expectedWord = 'loss';
    const expectedGuessedLettersSet = new Set();
    const expectedNumMissed = expectedWord.length;

    render(<PirateWordsLoss missedWord={expectedWord} guessedLettersSet={expectedGuessedLettersSet} />);

    const missedBy = screen.getByTestId('missed-by-num-letters');
    expect(missedBy).toHaveTextContent(expectedNumMissed);
  });

  test('Loss page correctly calculates SOME correct guesses', () => {
    const expectedWord = 'loss';
    const expectedGuessedLettersSet = new Set(['L', 'O']);
    const expectedNumMissed = expectedWord.length - 2;

    render(<PirateWordsLoss missedWord={expectedWord} guessedLettersSet={expectedGuessedLettersSet} />);

    const missedBy = screen.getByTestId('missed-by-num-letters');
    expect(missedBy).toHaveTextContent(expectedNumMissed);
  });
});