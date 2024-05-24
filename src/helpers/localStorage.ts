import { IMovieShort } from '@/models/Movie';

export const getLocalStoreItems = () =>
  JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];

export const addMovieToLocalStorage = (movie: IMovieShort) => {
  const updatedMovies = [...getLocalStoreItems(), movie];
  localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
};

export const deleteMovieFromLocalStorage = (movie: IMovieShort) => {
  const updatedMovies = getLocalStoreItems().filter((storedMovie) => movie.id !== storedMovie.id);
  localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
};
