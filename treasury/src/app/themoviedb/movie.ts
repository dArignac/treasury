import { isNull } from 'util';

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

  /**
   * Generic function for different poster variants. Returns the URL to the poster image.
   * Poster variants are (currently): w92, w154, w185, w342, w500, w780, original
   * @param {string} variant
   * @returns {string}
   */
  private getPosterImage(variant: string): string {
    if (!isNull(this.poster_path)) {
      return environment.themoviedb.imageBaseURL + variant + '/' + this.poster_path;
    }
    return null;
  }

  /**
   * Creates a list of Movie from the given JSON list.
   * Is used directly with TheMovieDB data as well as with Firebase collections.
   * @param jsonList
   * @returns {Movie[]}
   */
  public static fromJSONList(jsonList): Movie[] {
    return jsonList.map(Movie.fromJSON);
  }

  /**
   * Creates a Movie instance from the given JSON data.
   * @param json
   * @returns {Movie}
   */
  public static fromJSON(json): Movie {
    let m = new Movie();
    m.error = 200;
    for (let key of Object.getOwnPropertyNames(json)) {
      m[key] = json[key];
    }
    return m;
  }
}
