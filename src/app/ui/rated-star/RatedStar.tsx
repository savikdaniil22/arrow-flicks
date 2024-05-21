import { IMovieShort, IRatedStarProps } from '@/models/Movie';
import styles from './RatedStar.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const RatedStar: React.FC<IRatedStarProps> = ({ movie }) => {
  const [ratedMovies, setRatedMovies] = useState<IMovieShort[]>([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];
    setRatedMovies(storedMovies);
  }, []);

  const addMovieToLocalStorage = (ratedMovie: IMovieShort) => {
    const updatedMovies = [...ratedMovies, ratedMovie];
    setRatedMovies(updatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
  };
  const deleteMovieFromLocalStorage = (ratedMovie: IMovieShort) => {
    const updatedMovies = ratedMovies.filter((ratedMovie) => movie.id !== ratedMovie.id);
    setRatedMovies(updatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
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
