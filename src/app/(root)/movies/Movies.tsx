'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../../ui/movie-card/MovieCard';
import styles from './Movies.module.scss';
import { IGenre, IMovieShort, IMoviesSearchResponse } from '@/models/Movie';
import { Pagination } from '@mantine/core';

const fetchMovies = async (activePage: number, sorting: string): Promise<IMoviesSearchResponse> => {
  const res = await fetch(
    `/api/tmdb?endpoint=discover/movie&params={"include_adult":false,"include_video":false,"language":"en-US","page":"${activePage}","sort_by":"${sorting}"}`,
  );
  return await res.json();
};

const fetchGenres = async (): Promise<IGenre[]> => {
  const res = await fetch('/api/tmdb?endpoint=genre/movie/list&params={"language":"en-US"}');
  const data = await res.json();
  return data.genres;
};

export default function Movies() {
  const [movies, setMovies] = useState<IMoviesSearchResponse>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [activePage, setPage] = useState(1);
  const [sorting, setSorting] = useState('popularity.desc');

  useEffect(() => {
    fetchMovies(activePage, sorting).then((data) => {
      setMovies(data);
    });
  }, [activePage, sorting]);

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data || []);
    });
  }, []);

  return (
    <div className={styles.movies}>
      <h1>Movies</h1>
      <div className={styles.movieList}>
        {movies?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>

      <Pagination value={activePage} onChange={setPage} total={movies?.total_pages || 1} />
    </div>
  );
}
