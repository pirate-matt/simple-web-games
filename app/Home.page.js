import Link from 'next/link';

export default function HomePage() {
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
          <li><Link href="/games/coding/the-high-seas-of-javascript">Explore the high seas on a JavaScript adventure!</Link></li>
        </ul>
      </section>
    </main>
  )
}