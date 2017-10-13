import { IMovie } from './imovie';

export interface MovieResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}
