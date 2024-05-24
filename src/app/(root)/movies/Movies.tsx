'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../../ui/movie-card/MovieCard';
import styles from './Movies.module.scss';
import { IMovieGenre, IMoviesSearchResponse } from '@/models/Movie';
import { Loader, Pagination } from '@mantine/core';
import { fetchGenres, fetchMovies } from '@/helpers/apis';
import Filter from '@/app/ui/filter/Filter';
import NotFoundList from '@/app/ui/not-found-list/NotFoundList';

export default function Movies() {
  const [movies, setMovies] = useState<IMoviesSearchResponse>();
  const [genres, setGenres] = useState<IMovieGenre[]>([]);
  const [activePage, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, filter).then((data) => {
      setMovies(data);
      setIsLoading(false);
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
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader color="blue" />
        </div>
      ) : (
        <div className={styles.movieList}>
          {movies?.results && movies.results.length > 0 ? (
            <>
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
              ))}
            </>
          ) : (
            <NotFoundList></NotFoundList>
          )}
        </div>
      )}
      <div className={styles.pagination}>
        {movies && movies.total_pages > 1 ? (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={movies?.total_pages || 1}
            siblings={1}
            boundaries={0}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
