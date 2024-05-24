import { IMovieShort, IRatedStarProps } from '@/models/Movie';
import styles from './RatedStar.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  addMovieToLocalStorage,
  deleteMovieFromLocalStorage,
  getLocalStoreItems,
} from '@/helpers/localStorage';

const RatedStar: React.FC<IRatedStarProps> = ({ movie, updateMovies }) => {
  const [ratedMovies, setRatedMovies] = useState<IMovieShort[]>([]);

  useEffect(() => {
    setRatedMovies(getLocalStoreItems());
  }, []);

  const isMovieRated = (movie: IMovieShort): boolean => {
    return ratedMovies.some((m) => m.id === movie.id);
  };

  const addMovie = (movie: IMovieShort) => {
    addMovieToLocalStorage(movie);
    setRatedMovies(getLocalStoreItems());
    updateMovies && updateMovies();
  };

  const deleteMovie = (movie: IMovieShort) => {
    deleteMovieFromLocalStorage(movie);
    setRatedMovies(getLocalStoreItems());
    updateMovies && updateMovies();
  };

  return (
    <>
      {isMovieRated(movie) ? (
        <Image
          className={styles.star}
          src="/ratedstar.svg"
          alt="ratedstar"
          width={28}
          height={28}
          onClick={() => deleteMovie(movie)}
        />
      ) : (
        <Image
          className={styles.star}
          src="/star.svg"
          alt="star"
          width={28}
          height={28}
          onClick={() => addMovie(movie)}
        />
      )}
    </>
  );
};

export default RatedStar;
