import Image from 'next/image';
import Link from 'next/link';

import ExternalLink from '@/components/ExternalLink';

const metadata = {
  title: 'Simple Web Games',
};

export {
  metadata,
};

export default function HomePage() {
  return (
    <main>
      <h1>Simple Web Games</h1>
      <p>
        Welcome to this collection of simple web games! {"We've"} built these to
        practice our coding skills and have some small publicly available
        examples of our trade. {"They're"} nothing fancy and {"aren't"} updated
        very often. If you notice a problem, feel free to open an issue in one
        of the main contributors repositories.
      </p>
      <table aria-labelledby='table-title--Main-Contributors'>
        <thead>
          <tr>
            <th id="table-title--Main-Contributors" colSpan="2">Main Contributors</th>
          </tr>
          <tr>
            <th>Dev</th>
            <th>Repo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>piratematt</td>
            <td>
              <pre>
                <ExternalLink href="https://github.com/pirate-matt/simple-web-games">
                  simple-web-games
                </ExternalLink>
              </pre>
            </td>
          </tr>
          <tr>
            <td>btarnow</td>
            <td>
              <pre>
                <ExternalLink href="https://github.com/btarnow/Games">Games</ExternalLink>
              </pre>
            </td>
          </tr>
        </tbody>
      </table>

      <section>
        <h2>Word Games</h2>
        <p></p>

        <section aria-labelledby="game-title--PirateWords">
          <h3 id="game-title--PirateWords">
            <Image
              src="/piratewords.icon.png"
              alt="PirateWords Game Icon"
              width={44}
              height={44}
            />
            PirateWords
          </h3>
          <p>
            Author:{' '}
            <ExternalLink href="https://github.com/pirate-matt">piratematt</ExternalLink>
          </p>
          <p>
            TODO: game preview
          </p>
          <p>
            Do you dare join these pirates? For fun, the captain forces the crew
            to guess his favorite word. If they {"can't..."} splash into the
            drink they go!
          </p>
          <p>
            <Link href="/games/piratewords">
              {"I'm"} feeling brave, let me aboard matey!
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}