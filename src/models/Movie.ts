export interface IMoviesSearch {
  language: string;
  with_genres: string | null;
  primary_release_year: string | null;
  vote_average: {
    lte: string | null;
    gte: string | null;
  };
  sort_by: string | null;
  page: number;
}

export interface IMoviesSearchResponse {
  page: number;
  results: IMovieShort[];
  total_pages: number;
  total_results: number;
}

export interface IMovieShort {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface IProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface IMovie extends IMovieShort {
  runtime: number;
  budget: number;
  revenue: number;
  genres: IGenre[];
  overview: string;
  production_companies: IProductionCompany[];
  videos: string[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IMovieCardProps {
  movie: IMovieShort;
  genres: IGenre[];
}

export interface IMovieCardBigProps {
  movie: IMovie;
}
