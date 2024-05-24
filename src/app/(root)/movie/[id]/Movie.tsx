'use client';

import { IMovie } from '@/models/Movie';
import styles from './Movie.module.scss';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMovieById, fetchTrailerById } from '@/helpers/apis';
import MovieCardBig from '@/app/ui/movie-card-big/MovieCardBig';
import { Loader } from '@mantine/core';

export default function Movie() {
  const [trailerKey, setTrailerKey] = useState<string>();
  const [movie, setMovie] = useState<IMovie | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useParams();
  useEffect(() => {
    fetchMovieById(router!.id as string).then((data) => {
      setMovie(data);
      setIsLoading(false);
      fetchTrailerById(data.id).then((data) => {
        setTrailerKey(data);
      });
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader color="blue" />
        </div>
      ) : (
        <div className={styles.movie}>
          <div className={styles.router}>
            <a href="/movies">Movies</a>
            <p>/</p>
            <a>{movie?.original_title}</a>
          </div>
          <MovieCardBig movie={movie} trailerKey={trailerKey} />
        </div>
      )}
    </>
  );
}
