import Link from 'next/link';

import PirateWordsGame from './PirateWordsGame';

import styles from './piratewords.module.css';

const metadata = {
  title: 'Pirate Words',
};

export default function Page() {
  return (
    <>
      <main>
        <h1>Pirate Words</h1>

        <PirateWordsGame />
      </main>
      <footer className={styles.footer}>
        Take me <Link href="/">Home</Link>!
      </footer>
    </>
  )
};

export {
  metadata,
};