import Image from 'next/image';
import styles from './MovieCardBig.module.scss';
import { IMovie, IMovieShort } from '@/models/Movie';
import RatedStar from '../rated-star/RatedStar';
import { changeNumberToVoteCount } from '@/helpers/formater';

interface IMovieCardBigProps {
  movie?: IMovie;
  trailerKey?: string;
}

const MovieCardBig: React.FC<IMovieCardBigProps> = ({ movie, trailerKey }) => {
  const genreNames = movie?.genres
    .map((genre: { id: number; name: string }) => genre.name)
    .join(', ');
  const releaseDate =
    movie?.release_date &&
    new Date(movie?.release_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const mapToMovieShort = (movie?: IMovie) => {
    return {
      id: movie?.id,
      original_title: movie?.original_title,
      poster_path: movie?.poster_path,
      release_date: movie?.release_date,
      vote_average: movie?.vote_average,
      vote_count: movie?.vote_count,
      genre_ids: movie?.genres.map((genre) => genre.id),
    } as IMovieShort;
  };

  return (
    <div className={styles.info}>
      <div className={styles.moviecard}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt="poster"
          width={250}
          height={352}
        />
        <div className={styles.moviecardMain}>
          <div className={styles.moviecardInfo}>
            <div className={styles.moviecardInfoHeader}>
              <h1>{movie?.original_title}</h1>
              <RatedStar movie={mapToMovieShort(movie)}></RatedStar>
            </div>
            <p className={styles.moviecardInfoYear}>{movie?.release_date.split('-')[0]}</p>
            <div className={styles.moviecardInfoRaiting}>
              <Image src="/ratingstar.svg" alt="ratingstar" width={28} height={28} />
              <h1>{movie?.vote_average.toFixed(1)}</h1>
              <p>({movie?.vote_count && changeNumberToVoteCount(movie?.vote_count)})</p>
            </div>
          </div>
          <div className={styles.moviecardAllInfo}>
            <div className={styles.moviecardDuration}>
              <p>Duration</p>
              <h1>
                {movie?.runtime && Math.floor(movie?.runtime / 60)}h{' '}
                {movie?.runtime && movie?.runtime % 60}m
              </h1>
            </div>
            <div className={styles.moviecardPremiere}>
              <p>Premiere</p>
              <h1>{releaseDate}</h1>
            </div>
            <div className={styles.moviecardBudget}>
              <p>Budget</p>
              <h1>${movie?.budget && changeNumberToVoteCount(movie?.budget)}</h1>
            </div>
            <div className={styles.moviecardGross}>
              <p>Gross worldwide</p>
              <h1>${movie?.revenue && changeNumberToVoteCount(movie?.revenue)}</h1>
            </div>
            <div className={styles.moviecardGanres}>
              <p>Genres</p>
              <h1>{genreNames}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondInformation}>
        {trailerKey && (
          <>
            <h1>Trailer</h1>
            <iframe
              width={500}
              height={281}
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <span className={styles.line} />
          </>
        )}
        {movie?.overview && (
          <>
            <h1>Description</h1>
            <p>{movie?.overview}</p>
            <span className={styles.line} />
          </>
        )}
        <h1>Production</h1>
        <div className={styles.production}>
          {movie?.production_companies.map(
            (company: { id: number; name: string; logo_path: string }, index: number) => (
              <div key={index} className={styles.productionCompany}>
                <Image
                  className={styles.productionCompanyImage}
                  src={
                    company.logo_path
                      ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
                      : '/nocompanyimg.svg'
                  }
                  alt="production"
                  width={40}
                  height={40}
                />
                <h2>{company.name}</h2>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCardBig;
