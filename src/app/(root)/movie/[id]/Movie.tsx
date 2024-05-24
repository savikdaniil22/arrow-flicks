'use client';

import { IMovie } from '@/models/Movie';
import styles from './Movie.module.scss';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMovieById, fetchTrailerById } from '@/helpers/apis';
import MovieCardBig from '@/app/ui/movie-card-big/MovieCardBig';

export default function Movie() {
  const [trailerKey, setTrailerKey] = useState<string>();
  const [movie, setMovie] = useState<IMovie | undefined>();

  const router = useParams();
  useEffect(() => {
    fetchMovieById(router!.id as string).then((data) => {
      setMovie(data);
      fetchTrailerById(data.id).then((data) => {
        setTrailerKey(data);
      });
    });
  }, []);

  return (
    <div className={styles.movie}>
      <div className={styles.router}>
        <a href="/movies">Movies</a>
        <p>/</p>
        <a>{movie?.original_title}</a>
      </div>
      <MovieCardBig movie={movie} trailerKey={trailerKey} />
    </div>
  );
}
