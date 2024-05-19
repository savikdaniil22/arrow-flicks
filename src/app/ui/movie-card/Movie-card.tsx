import Image from "next/image"
import styles from './Movie-card.module.scss'

export default function MovieCard() {
  return (
    <div className={styles.moviecard}>
      <Image src="/noposter.svg" alt="poster" width={119} height={170} />
      <div className={styles.moviecardMain}>
        <div className={styles.moviecardInfo}>
          <div className={styles.moviecardInfoHeader}>
            <h1>The Green Mile</h1>
            <Image className={styles.star} src="/ratedstar.svg" alt="ratedstar" width={28} height={28} />
          </div>
          <p className={styles.moviecardInfoYear}>1999</p>
          <div className={styles.moviecardInfoRaiting}>
            <Image src="/ratingstar.svg" alt="ratingstar" width={28} height={28} />
            <h1>9.3</h1>
            <p>(2.9M)</p>
          </div>
        </div>
        <div className={styles.moviecardGanres}>
          <p>Genres</p>
          <h1>Drama, Crime, Fantasy</h1>
        </div>
      </div>
    </div >
  );
}