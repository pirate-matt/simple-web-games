import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import PirateWords from './PirateWords.page.js';

describe('TDD for PirateWords game', () => {
  test('Make sure user see progress section', () => {
    render(<PirateWords />);

    const progressSection = screen.getByText(/progress/i);

    expect(progressSection).toBeInTheDocument();
  });

  test('make sure user can see how many letters they need to guess', () => {
    const expectedWord = 'Hello';
    const expectedNumLettersToGuess = expectedWord.length;

    render(<PirateWords wordToGuess={expectedWord} />);

    const guessSection = screen.getByRole('status', { name: 'correct letters and blank un-guessed letters' });

    expect(guessSection).toBeInTheDocument();

    const lettersToGuess = within(guessSection).getAllByLabelText('un-guessed letter');

    expect(lettersToGuess.length).toBe(expectedNumLettersToGuess);
  });

  test.each('abcdefghijklmnopqrstuvwxyz'.split(''))('make sure user is able to click on each letter: %p to guess', (letterToGuess) => {
    render(<PirateWords />);

    const buttonForLetter = screen.getByRole('button', { name: new RegExp(letterToGuess, 'i')});

    userEvent.click(buttonForLetter);

    expect(buttonForLetter).toBeInTheDocument();

    // TODO: should I be asserting anything here?
  });

  test('Make sure you can return to the home page', () => {
    render(<PirateWords />);

    const homePageLink = screen.getByText('Home').closest('a');

    expect(homePageLink).toHaveAttribute('href', '/');
  });
});
