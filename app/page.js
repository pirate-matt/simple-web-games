import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Play Games</h1>
      <section>
        <h2>Word Games</h2>
        <ul>
          <li><Link href="/games/words/pirate-words">Guess words with pirates!</Link></li>
        </ul>
      </section>
      <section>
        <h2>Coding Games</h2>
        <ul>
          <li><Link href="/games/coding/the-high-seas-of-javascript">Head to sea on a JavaScript Adventure!</Link></li>
        </ul>
      </section>
    </main>
  )
}
