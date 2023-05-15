import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Play Games</h1>
      <div>
        <Link href="/games/piratewords">Guess words with pirates!</Link>
      </div>
    </main>
  )
}
