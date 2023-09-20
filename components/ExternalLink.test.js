import { render, screen } from '@testing-library/react';

import ExternalLink from './ExternalLink';

describe('External Link tests', () => {
  test('external links have expected security conscious attributes to prevent [reverse tab-nabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing)', () => {
    const expectedClickText = 'Click me';

    render(
      <ExternalLink href="https://github.com/pirate-matt">
        <i className="fab fa-github" aria-hidden="true"></i> {expectedClickText}
      </ExternalLink>
    );

    const externalLinkEl = screen.getByRole('link', { name: expectedClickText });

    expect(externalLinkEl).toBeInTheDocument(); // for sanity make sure it renders

    expect(externalLinkEl).toHaveAttribute('target', '_blank'); // we're opening in a new tab

    const relAttrs = externalLinkEl.rel.split(' '); // we have both of the expected rel values (order unimportant)
    ['noreferrer', 'noopener'].forEach(attrVal => expect(relAttrs).toContain(attrVal));
  });
});