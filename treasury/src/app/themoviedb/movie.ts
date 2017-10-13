import { IMovie } from './imovie';

export class Movie implements IMovie {
  adult: boolean;
  backdrop_path: string;
  error: number;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;


  /**
   * Creates an instance of Movie from the given value that usually is returned from TheMovieDB API.
   * @param {IMovie} item
   * @returns {Movie}
   */
  public static fromResponse(item: IMovie): Movie {
    let m = new Movie();
    m.error = 200;
    for (let key of Object.getOwnPropertyNames(item)) {
      m[key] = item[key];
    }
    return m;
  }
}
