import Link from 'next/link';

const metadata = {
  title: 'Play Games',
};

export {
  metadata,
};

export default function HomePage() {
  return (
    <main>
      <h1>Play Games</h1>
      <div>
        <Link href="/games/piratewords">Guess words with pirates!</Link>
      </div>
    </main>
  )
}