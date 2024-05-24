import Image from 'next/image';
import styles from './MovieCard.module.scss';
import Link from 'next/link';
import RatedStar from '../rated-star/RatedStar';
import { IMovieGenre, IMovieShort } from '@/models/Movie';
import { changeNumberToVoteCount, roundToNearestTen } from '@/helpers/formater';

interface IMovieCardProps {
  movie: IMovieShort;
  genres: IMovieGenre[];
  updateMovies?: () => void;
}

const MovieCard: React.FC<IMovieCardProps> = ({ movie, genres, updateMovies }) => {
  const genreNames = movie.genre_ids
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
    .filter(Boolean);
  const releaseYear = movie.release_date.split('-')[0];
  const roundedVoteAvarage = roundToNearestTen(movie.vote_average);

  return (
    <div className={styles.moviecard}>
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : '/noposter.svg'
        }
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
            <RatedStar movie={movie} updateMovies={updateMovies}></RatedStar>
          </div>
          <p className={styles.moviecardInfoYear}>{releaseYear}</p>
          <div className={styles.moviecardInfoRaiting}>
            <Image src="/ratingstar.svg" alt="ratingstar" width={28} height={28} />
            <h1>{roundedVoteAvarage}</h1>
            <p>({changeNumberToVoteCount(movie.vote_count)})</p>
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
