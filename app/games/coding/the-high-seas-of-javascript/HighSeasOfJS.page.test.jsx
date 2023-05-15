import { render, screen } from '@testing-library/react'

import HighSeasOfJS from './HighSeasOfJS.page';
export default HighSeasOfJS;

describe('TDD for HighSeasOfJS game', () => {
  test('Make sure you can return to the home page', () => {
    render(<HighSeasOfJS />);

    const homePageLink = screen.getByText('Home').closest('a');

    expect(homePageLink).toHaveAttribute('href', '/');
  });
});