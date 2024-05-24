import Image from 'next/image';
import styles from './NotFoundList.module.scss';

export default function NotFoundList() {
  return (
    <div className={styles.noMovies}>
      <Image src="/donothavemovie.svg" alt="donothavemovie" width={310} height={252} />
      <p>We don&apos;t have such movies, look for another one</p>
    </div>
  );
}
