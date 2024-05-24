import { IFilterFormValues } from '@/app/ui/filter/Filter';
import { IMovieGenre, IMovie, IMoviesSearchResponse } from '@/models/Movie';

export const fetchMovies = async (
  activePage: number,
  filter?: IFilterFormValues,
): Promise<IMoviesSearchResponse> => {
  const params = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: activePage,
    sort_by: filter?.sort || 'popularity.desc',
    with_genres: filter?.genres?.join(', ') || '',
    primary_release_year: filter?.year || '',
    'vote_average.lte': filter?.lte || '',
    'vote_average.gte': filter?.gte || '',
  };
  const res = await fetch(`/api/tmdb?endpoint=discover/movie&params=${JSON.stringify(params)}`);
  return await res.json();
};

export const fetchGenres = async (): Promise<IMovieGenre[]> => {
  const res = await fetch('/api/tmdb?endpoint=genre/movie/list&params={"language":"en-US"}');
  const data = await res.json();
  return data.genres;
};

export const fetchMovieById = async (id: string): Promise<IMovie> => {
  const res = await fetch(`/api/tmdb?endpoint=movie/${id}&params={"language":"en-US"}`);
  const data = await res.json();
  return data;
};

export const fetchTrailerById = async (id: number): Promise<string> => {
  const res = await fetch(`/api/tmdb?endpoint=movie/${id}/videos`);
  const data = await res.json();
  return data.results[0]?.key;
};
