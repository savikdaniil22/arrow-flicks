'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../../ui/movie-card/MovieCard';
import styles from './Movies.module.scss';
import { IGenre, IMoviesSearchResponse } from '@/models/Movie';
import { Pagination } from '@mantine/core';
import { fetchGenres, fetchMovies } from '@/helpers/apis';
import Filter from '@/app/ui/filter/Filter';

export default function Movies() {
  const [movies, setMovies] = useState<IMoviesSearchResponse>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [activePage, setPage] = useState(1);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    fetchMovies(activePage, filter).then((data) => {
      setMovies(data);
    });
  }, [activePage, filter]);

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data || []);
    });
  }, []);

  return (
    <div className={styles.movies}>
      <h1>Movies</h1>
      <Filter
        genres={genres}
        setFilter={(values) => {
          setFilter(values);
        }}
      ></Filter>

      <div className={styles.movieList}>
        {movies?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={movies?.total_pages || 1}
          siblings={1}
          boundaries={0}
        />
      </div>
    </div>
  );
}
