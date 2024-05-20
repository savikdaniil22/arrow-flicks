'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../ui/movie-card/MovieCard';
import styles from './Movies.module.scss';
import { IGenre, IMovieShort } from '@/models/Movie';

const fetchMovies = async (): Promise<IMovieShort[]> => {
  const res = await fetch(
    `/api/tmdb?endpoint=discover/movie&params={"include_adult":false,"include_video":false,"language":"en-US","page":1,"sort_by":"popularity.desc"}`,
  );
  const data = await res.json();
  return data.results;
};

const fetchGenres = async (): Promise<IGenre[]> => {
  const res = await fetch('/api/tmdb?endpoint=genre/movie/list&params={"language":"en-US"}');
  const data = await res.json();
  return data.genres;
};

export default function Movies() {
  const [movies, setMovies] = useState<IMovieShort[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data || []);
    });

    fetchGenres().then((data) => {
      setGenres(data || []);
    });
  }, []);

  return (
    <div className={styles.movies}>
      <h1>Movies</h1>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
}
