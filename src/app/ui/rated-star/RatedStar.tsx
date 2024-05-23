import { IMovieShort, IRatedStarProps } from '@/models/Movie';
import styles from './RatedStar.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const RatedStar: React.FC<IRatedStarProps> = ({ movie, updateMovies }) => {
  const [ratedMovies, setRatedMovies] = useState<IMovieShort[]>([]);

  const getLocalStoreItems = () =>
    JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];

  useEffect(() => {
    setRatedMovies(getLocalStoreItems());
  }, []);

  const addMovieToLocalStorage = (movie: IMovieShort) => {
    const updatedMovies = [...getLocalStoreItems(), movie];
    setRatedMovies(updatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
    updateMovies && updateMovies();
  };

  const deleteMovieFromLocalStorage = (movie: IMovieShort) => {
    const updatedMovies = getLocalStoreItems().filter((storedMovie) => movie.id !== storedMovie.id);
    setRatedMovies(updatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
    updateMovies && updateMovies();
  };

  const isMovieRated = (movie: IMovieShort): boolean => {
    return ratedMovies.some((m) => m.id === movie.id);
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
          onClick={() => deleteMovieFromLocalStorage(movie)}
        />
      ) : (
        <Image
          className={styles.star}
          src="/star.svg"
          alt="star"
          width={28}
          height={28}
          onClick={() => addMovieToLocalStorage(movie)}
        />
      )}
    </>
  );
};

export default RatedStar;
