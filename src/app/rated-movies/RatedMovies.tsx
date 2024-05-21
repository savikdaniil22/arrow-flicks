'use client';

import { IGenre, IMovieShort } from '@/models/Movie';
import MovieCard from '../ui/movie-card/MovieCard';
import styles from './RatedMovies.module.scss';
import { useEffect, useState } from 'react';

const fetchGenres = async (): Promise<IGenre[]> => {
  const res = await fetch('/api/tmdb?endpoint=genre/movie/list&params={"language":"en-US"}');
  const data = await res.json();
  return data.genres;
};

export default function RatedMovies() {
  const [movies, setMovies] = useState<IMovieShort[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  const updateMovies = () => {
    const storedMovies = JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];
    setMovies(storedMovies);
  };

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data || []);
    });
    updateMovies();
  }, []);

  return (
    <div className={styles.movies}>
      <h1>Rated Movies</h1>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} updateMovies={updateMovies} />
        ))}
      </div>
    </div>
  );
}
