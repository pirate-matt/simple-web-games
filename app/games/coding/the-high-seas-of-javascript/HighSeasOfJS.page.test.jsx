import { render, screen } from '@testing-library/react'

import HighSeasOfJSPage from './HighSeasOfJS.page';

describe('TDD for HighSeasOfJS game', () => {
  test('page renders', () => {
    const { container } = render(<HighSeasOfJSPage />);

    expect(container).not.toBeEmptyDOMElement();
  });
});