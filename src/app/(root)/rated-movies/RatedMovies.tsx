'use client';

import { IMovieGenre, IMovieShort } from '@/models/Movie';
import MovieCard from '../../ui/movie-card/MovieCard';
import styles from './RatedMovies.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pagination } from '@mantine/core';
import { fetchGenres } from '@/helpers/apis';
import NotFoundList from '@/app/ui/not-found-list/NotFoundList';

const itemsPerPage = 4;

export default function RatedMovies() {
  const [movies, setMovies] = useState<IMovieShort[]>([]);
  const [genres, setGenres] = useState<IMovieGenre[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePage, setPage] = useState(1);
  const [storedMovies, setStoredMovies] = useState<IMovieShort[]>([]);

  const getVisibleMovies = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
  };

  const handleSearch = () => {
    const storedMovies = JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];
    if (searchTerm === '') {
      setMovies(storedMovies);
    } else {
      const filteredMovies = storedMovies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setMovies(filteredMovies);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getTotalPages = () => {
    return movies.length <= itemsPerPage ? 0 : Math.ceil(movies.length / itemsPerPage);
  };

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];
    setStoredMovies(storedMovies);
    setMovies(storedMovies);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [activePage]);

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data || []);
      handleSearch();
    });
  }, []);

  if (storedMovies.length === 0) {
    return (
      <div className={styles.noRatedPage}>
        <div className={styles.noRatedItem}>
          <Image src="/haventrated.svg" alt="noRatedPage" width={400} height={300} />
          <p>You haven&apos;t rated any films yet</p>
          <a href="/movies">Find movies</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ratedMoviesPage}>
      <div className={styles.ratedMovies}>
        <div className={styles.ratedMoviesHeaders}>
          <h1>Rated Movies</h1>
          <div className={styles.ratedMoviesSearch}>
            <div className={styles.ratedMoviesSearchText}>
              <Image src="/search.svg" alt="ratedstar" width={16} height={16} />
              <input
                type="text"
                placeholder="Search movie title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className={styles.movieList}>
          {getVisibleMovies().length > 0 ? (
            getVisibleMovies().map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                updateMovies={() => handleSearch()}
              />
            ))
          ) : (
            <NotFoundList></NotFoundList>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={getTotalPages()}
          siblings={1}
          boundaries={0}
        />
      </div>
    </div>
  );
}
