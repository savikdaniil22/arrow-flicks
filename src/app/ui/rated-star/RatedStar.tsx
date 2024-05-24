import { IMovieShort } from '@/models/Movie';
import styles from './RatedStar.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  addMovieToLocalStorage,
  deleteMovieFromLocalStorage,
  getLocalStoreItems,
} from '@/helpers/localStorage';
import RatingPopup from '../rating-popup/RatingPopup';

interface IRatedStarProps {
  movie: IMovieShort;
  updateMovies?: () => void;
}

const RatedStar: React.FC<IRatedStarProps> = ({ movie, updateMovies }) => {
  const [ratedMovies, setRatedMovies] = useState<IMovieShort[]>([]);
  const [opened, setOpened] = useState(false);

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
        <div className={styles.container}>
          <Image
            className={styles.star}
            src="/ratedstar.svg"
            alt="ratedstar"
            width={28}
            height={28}
            onClick={() => setOpened(true)}
          />
          <span className={styles.rating}>{movie.rating}</span>
        </div>
      ) : (
        <Image
          className={styles.star}
          src="/star.svg"
          alt="star"
          width={28}
          height={28}
          onClick={() => setOpened(true)}
        />
      )}
      <RatingPopup
        opened={opened}
        movie={movie}
        closeModal={() => setOpened(false)}
        addMovie={(data) => addMovie(data)}
        deleteMovie={(data) => deleteMovie(data)}
      ></RatingPopup>
    </>
  );
};

export default RatedStar;
