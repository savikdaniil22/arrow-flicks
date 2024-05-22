'use client';

import { IGenre, IMovieShort } from '@/models/Movie';
import MovieCard from '../ui/movie-card/MovieCard';
import styles from './RatedMovies.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    <div className={styles.ratedMoviesPage}>
      {movies ? (
        <div className={styles.ratedMovies}>
          <div className={styles.ratedMoviesHeaders}>
            <h1>Rated Movies</h1>
            <div className={styles.ratedMoviesSearch}>
              <div className={styles.ratedMoviesSearchText}>
                <Image src="/search.svg" alt="ratedstar" width={16} height={16} />
                <input type="text" placeholder="Search movie title"></input>
              </div>
              <button>Search</button>
            </div>
          </div>

          <div className={styles.movieList}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} updateMovies={updateMovies} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noRatedPage}>
          <div className={styles.noRatedItem}>
            <Image src="/haventrated.svg" alt="noRatedPage" width={400} height={300} />
            <p>You haven't rated any films yet</p>
            <a href="/movies">Find movies</a>
          </div>
        </div>
      )}
    </div>
  );
}
