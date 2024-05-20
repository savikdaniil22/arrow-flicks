import Image from 'next/image';
import styles from './MovieCard.module.scss';
import { IMovieCardProps } from '@/models/Movie';
import Link from 'next/link';

function roundToNearestTen(num: number): number {
  return Math.round(num * 10) / 10;
}

function formatNumber(num: number): string {
  return num >= 100000
    ? `${roundToNearestTen(num / 1000000)}M`
    : num >= 1000
      ? `${roundToNearestTen(num / 1000)}K`
      : `${num}`;
}

const MovieCard: React.FC<IMovieCardProps> = ({ movie, genres }) => {
  const genreNames = movie.genre_ids
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
    .filter(Boolean);
  const releaseYear = movie.release_date.split('-')[0];
  const roundedVoteAvarage = roundToNearestTen(movie.vote_average);

  return (
    <div className={styles.moviecard}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="poster"
        width={119}
        height={170}
      />
      <div className={styles.moviecardMain}>
        <div className={styles.moviecardInfo}>
          <div className={styles.moviecardInfoHeader}>
            <Link className={styles.moviecardInfoHeaderTitle} href={`movie/${movie.id}`}>
              {movie.original_title}
            </Link>
            <Image
              className={styles.star}
              src="/ratedstar.svg"
              alt="ratedstar"
              width={28}
              height={28}
            />
          </div>
          <p className={styles.moviecardInfoYear}>{releaseYear}</p>
          <div className={styles.moviecardInfoRaiting}>
            <Image src="/ratingstar.svg" alt="ratingstar" width={28} height={28} />
            <h1>{roundedVoteAvarage}</h1>
            <p>({formatNumber(movie.vote_count)})</p>
          </div>
        </div>
        <div className={styles.moviecardGanres}>
          <p>Genres</p>
          <h1>{genreNames.join(', ')}</h1>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
