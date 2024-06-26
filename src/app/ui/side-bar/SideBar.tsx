'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import styles from './SideBar.module.scss';

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.sidebar}>
      <Image src="/logo.svg" alt="logo" width={179} height={36} />
      <nav className={styles.links}>
        <ul>
          <li
            className={pathname === '/movies' ? styles.active : ''}
            onClick={() => handleRedirect('/movies')}
          >
            Movies
          </li>
          <li
            className={pathname === '/rated-movies' ? styles.active : ''}
            onClick={() => handleRedirect('/rated-movies')}
          >
            Rated movies
          </li>
        </ul>
      </nav>
    </div>
  );
}
