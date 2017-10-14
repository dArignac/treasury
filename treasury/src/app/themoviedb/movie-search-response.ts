import { IMovie } from './imovie';

export interface MovieSearchResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}
