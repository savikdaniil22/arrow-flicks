import styles from './Movie-card-big.module.scss';
import Image from "next/image"

export default function MovieCardBig() {
  return (
    <div className={styles.info}>
      <div className={styles.moviecard}>
        <Image src="/thegreenmile.svg" alt="poster" width={250} height={352} />
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
          <div className={styles.moviecardAllInfo}>
            <div className={styles.moviecardDuration}>
              <p>Duration</p>
              <h1>3h 09m</h1>
            </div>
            <div className={styles.moviecardPremiere}>
              <p>Premiere</p>
              <h1>December 6, 1999</h1>
            </div>
            <div className={styles.moviecardBudget}>
              <p>Budget</p>
              <h1>$125,000,000</h1>
            </div>
            <div className={styles.moviecardGross}>
              <p>Gross worldwide</p>
              <h1>$760,006,945</h1>
            </div>
            <div className={styles.moviecardGanres}>
              <p>Genres</p>
              <h1>Drama, Crime, Fantasy</h1>
            </div>
          </div>
        </div>
      </div >
      <div className={styles.secondInformation}>
        <h1>Trailer</h1>
        <Image src="/trailer.svg" alt="trailer" width={500} height={281} />
        <hr></hr>
        <h1>Description</h1>
        <p>
          Dan Brown's controversial best-selling novel about a powerful secret that's been kept under wraps for thousands of years comes to the screen in this suspense thriller from Director Ron Howard.
        </p>
        <hr></hr>
        <h1>Production</h1>
        <div className={styles.production}>
          <div className={styles.productioFirst}>
            <Image src="/" alt="production" width={40} height={40} />
            <h2>Castle Rock Entertainment</h2>
          </div>
          <div className={styles.productionSecont}>
            <Image src="/" alt="production" width={40} height={40} />
            <h2>Darkwoods Productions</h2>
          </div>
          <div className={styles.productionThird}>
            <Image src="/" alt="production" width={40} height={40} />
            <h2>Warner Bros. Pictures</h2>
          </div>
        </div>
      </div>
    </div>);
}