import Link from 'next/link';
import { Metadata } from 'next';

import styles from './games.module.css';

export const metadata = {
  title: 'Simple Web Games',
};

export default function GamesLayout({ children }) {
  return (
    <div className={styles.games}>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <nav>
          Take me <Link href="/">Home</Link>!
        </nav>
      </footer>
    </div>
  );
}