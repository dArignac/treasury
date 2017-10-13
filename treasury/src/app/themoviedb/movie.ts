import { environment } from '../../environments/environment';
import { IMovie } from './imovie';

/**
 * Class representing a Movie.
 */
export class Movie implements IMovie {
  adult: boolean;
  backdrop_path: string;
  error: number; // values like HTTP error codes
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

  /*
  Poster sizes are (currently)
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
   */

  // FIXME handle if there is no image
  getPosterImageSmall(): string {
    return environment.themoviedb.imageBaseURL + 'w92/' + this.poster_path;
  }

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
