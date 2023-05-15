import { render, screen } from '@testing-library/react'

import PirateWords from './page.js';

// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />)

//     const heading = screen.getByRole('heading', {
//       name: /welcome to next\.js!/i,
//     })

//     expect(heading).toBeInTheDocument()
//   })
// });

describe('TDD for PirateWords game', () => {
  test('Make sure you can return to the home page', () => {
    render(<PirateWords />);

    const homePageLink = screen.getByText('Home').closest('a');

    expect(homePageLink).toHaveAttribute('href', '/');
  });
});
