import { render, screen } from '@testing-library/react'

import GamesLayout from './Games.layout';

describe('Layout for all Games pages', () => {
  test('Make sure you can return to the home page', () => {
    render(
      <GamesLayout />
    );

    const homePageLink = screen.getByRole('link', { name: /home/i });

    expect(homePageLink).toHaveAttribute('href', '/');
  });

  test('Be sure layout handles any passed children', () => {
    render(
      <GamesLayout>
        <div>Passing in children</div>
      </GamesLayout>
    );

    const homePageLink = screen.getByText(/passing in children/i);

    expect(homePageLink).toBeInTheDocument();
  });
});