import { IMovieShort } from '@/models/Movie';

export const getLocalStoreItems = () =>
  JSON.parse(localStorage.getItem('ratedMovies') || '[]') as IMovieShort[];

export const addMovieToLocalStorage = (movie: IMovieShort) => {
  const isElementFound = getLocalStoreItems().some((data) => movie.id === data.id);
  let updatedMovies;
  if (isElementFound) {
    updatedMovies = getLocalStoreItems().map((data) => {
      if (data.id === movie.id) {
        return movie;
      } else {
        return data;
      }
    });
  } else {
    updatedMovies = [...getLocalStoreItems(), movie];
  }
  localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
};

export const deleteMovieFromLocalStorage = (movie: IMovieShort) => {
  const updatedMovies = getLocalStoreItems().filter((storedMovie) => movie.id !== storedMovie.id);
  localStorage.setItem('ratedMovies', JSON.stringify(updatedMovies));
};
