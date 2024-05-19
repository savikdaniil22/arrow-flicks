import Image from "next/image"
import styles from './Movies-card.module.scss'

export default function MovieCard() {
  return (
    <div className={styles.moviecard}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <div className={styles.moviecard}>
        <div className={styles.moviecard}>
          <h1>The Green Mile</h1>
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <p className={styles.moviecardYear}>1999</p>
        <div className={styles.moviecardRaiting}>
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <h1>9.3</h1>
          <p>(2.9M)</p>
        </div>
        <div className={styles.moviecardGanres}>
          <p>Genres</p>
          <h1>Drama,Crime,Fantasy</h1>
        </div>
      </div>
    </div >
  );
}