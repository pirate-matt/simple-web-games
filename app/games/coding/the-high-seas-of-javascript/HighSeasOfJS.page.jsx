import Link from 'next/link';

export default function HighSeasOfJS() {
  return (
    <main>
      <h1>Welcome to the <em>High Seas of JavaScript</em></h1>
      <p>
        TODO: explore the high seas!
      </p>
      <div>
        Take me <Link href="/">Home</Link>!
      </div>
    </main>
  );
}