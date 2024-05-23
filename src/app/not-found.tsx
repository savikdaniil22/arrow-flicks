import Image from 'next/image';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <Image className={styles.notFoundLogo} src="/logo.svg" alt="logo" width={179} height={36} />
      <div className={styles.notFound}>
        <div className={styles.notFounddItem}>
          <Image src="/notfound.svg" alt="notFound" width={656} height={196} />
          <p>We can’t find the page you are looking for</p>
          <a href="/movies">Find movies</a>
        </div>
      </div>
    </div>
  );
}
