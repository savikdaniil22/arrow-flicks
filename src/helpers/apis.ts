import { IGenre, IMovie, IMoviesSearchResponse } from '@/models/Movie';

export const fetchMovies = async (
  activePage: number,
  sorting: string,
): Promise<IMoviesSearchResponse> => {
  const res = await fetch(
    `/api/tmdb?endpoint=discover/movie&params={"include_adult":false,"include_video":false,"language":"en-US","page":"${activePage}","sort_by":"${sorting}"}`,
  );
  return await res.json();
};

export const fetchGenres = async (): Promise<IGenre[]> => {
  const res = await fetch('/api/tmdb?endpoint=genre/movie/list&params={"language":"en-US"}');
  const data = await res.json();
  return data.genres;
};

export const fetchMovie = async (id: string): Promise<IMovie> => {
  const res = await fetch(`/api/tmdb?endpoint=movie/${id}&params={"language":"en-US"}`);
  const data = await res.json();
  return data;
};

export const fetchTrailer = async (id: number): Promise<string> => {
  const res = await fetch(`/api/tmdb?endpoint=movie/${id}/videos`);
  const data = await res.json();
  return data.results[0]?.key;
};
