import { render, screen, within } from '@testing-library/react';

import HomePage, { metadata } from './Home.page';

describe('TDDing Home Page', () => {
  test('Page title is set as expected', () => {
    const expectedPageTitle = 'Simple Web Games';
    expect(metadata.title).toBe(expectedPageTitle);
  });

  test('Main contributors are listed and have links to repository', () => {
    render(<HomePage />);
    const mainContributors = screen.getByRole('table', { name: /main contributors/i });

    [{ devName: 'piratematt', repoName: 'simple-web-games' }, { devName:'btarnow', repoName: 'Games' }].forEach(({ devName, repoName }) => {
      try {
        const devNameEl = within(mainContributors).getByText(devName);
        expect(devNameEl).toBeInTheDocument();
      }
      catch(err) {
        err.message = `Failed to find dev—${err.message}`;
        throw err;
      }

      try {
        const repoLink = within(mainContributors).getByRole('link', { name: repoName });
        expect(repoLink).toBeInTheDocument();
      }
      catch(err) {
        err.message = `Failed to find repo—${err.message}`;
        throw err;
      }
    });
  });

  describe('Can view and play PirateWords', () => {
    let pirateWordsContainer;

    beforeEach(() => {
      render(<HomePage />);
      pirateWordsContainer = screen.getByRole('region', { name: /PirateWords/ });
    });

    afterEach(() => {
      pirateWordsContainer = undefined;
    });

    test('Can play PirateWords', () => {
      const pirateWordsNav = within(pirateWordsContainer).getByRole('link', { name: /let me aboard matey/i });
      expect(pirateWordsNav).toBeInTheDocument();
    });

    test('"piratematt" is author for PirateWords', () => {
      const authorEl = within(pirateWordsContainer).getByText(/author/i);
      const authorLink = within(authorEl).getByRole('link');
      expect(authorLink).toBeInTheDocument();
      expect(authorLink).toHaveTextContent(/piratematt/i);
    });

    test.skip('game preview is rendered', () => {
      expect('TODO: write test').toBe('test written');
    });
  });
});