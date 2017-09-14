import { MovieResponseItem } from './movie-response-item';

export interface MovieResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieResponseItem[];
}
