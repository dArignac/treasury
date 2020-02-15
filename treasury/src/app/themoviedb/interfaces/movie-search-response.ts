import { MovieResponse } from './movie-response';

export interface MovieSearchResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieResponse[];
}
