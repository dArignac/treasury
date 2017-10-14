import { isNull } from 'util';

import { environment } from '../../environments/environment';
import { IMovie } from './imovie';

/**
 * Class representing a Movie.
 */
export class Movie implements IMovie {
  // persisted properties
  adult: boolean;
  backdrop_path: string;
  // store actresses and directors as string only, we currently do not want to search for them and find their movies, instead we only use them as additional
  // static readonly data
  credits_actresses: string;
  credits_directors: string;
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

  // not persisted properties
  error: number; // values like HTTP error codes

  /**
   * Generic function for different poster variants. Returns the URL to the poster image.
   * Poster variants are (currently): w92, w154, w185, w342, w500, w780, original
   * @param {string} variant
   * @returns {string}
   */
  public getPosterImage(variant: string): string {
    if (!isNull(this.poster_path)) {
      return environment.themoviedb.imageBaseURL + variant + '/' + this.poster_path;
    }
    return null;
  }

  /**
   * Creates a list of Movie from the Firebase collection.
   * @param collection
   * @returns {Movie[]}
   */
  public static fromFirebaseCollection(collection): Movie[] {
    return collection.map(Movie.fromFirebaseObject);
  }

  /**
   * Create a movie instance from the given Firebase data.
   * It is assumed, that the returned data is complete. Meaning that we do not additionally query for additional data as in Movie.fromTMDBMovieSearchResult.
   * @param obj
   * @returns {Movie}
   */
  public static fromFirebaseObject(obj): Movie {
    let m = new Movie();
    m.error = 200;
    // this will set all keys and values coming in through the object
    for (let key of Object.getOwnPropertyNames(obj)) {
      m[key] = obj[key];
    }
    return m;
  }

  /**
   * Creates a Movie instance from the given data that is coming from a TMDB query.
   * In comparison to Movie.fromFirebaseObject this method additionally queries data that is not included in the result object.
   * @param {IMovie} result
   * @returns {Movie}
   */
  public static fromTMDBMovieSearchResult(result: IMovie): Movie {
    let m = new Movie();
    m.error = 200;
    // this will set all keys and values coming in through the result object
    for (let key of Object.getOwnPropertyNames(result)) {
      m[key] = result[key];
    }
    // TODO query additional
    return m;
  }

  /**
   * Returns an object representation of the movie.
   * This is mainly used for persisting the movie to Firebase. Here we decide, which properties will be persisted and which not.
   * @returns {Object}
   */
  public toJSON(): object {
    let o = {};
    for (let key of Object.getOwnPropertyNames(this)) {
      if (key != 'error') {
        o[key] = this[key];
      }
    }
    return o;
  }
}
