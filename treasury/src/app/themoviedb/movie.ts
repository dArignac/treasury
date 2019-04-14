import {environment} from '../../environments/environment';
import {IMovie} from './imovie';

/**
 * Class representing a Movie.
 */
export class Movie implements IMovie {
  // the python styled properties fail linting, see https://github.com/dArignac/treasury/issues/99 how to fix
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
   * Creates a list of Movie from the Firebase collection.
   * @param collection catalog data coming from Firebase
   * @returns Firebase catalog data mapped to a list of Movies
   */
  // FIXME type collection
  public static fromFirebaseCollection(collection): Movie[] {
    return collection.map(Movie.fromFirebaseObject);
  }

  /**
   * Creates a movie instance from the given data.
   * @param obj a JS object with movie keys
   * @returns the typed Movie
   */
  // FIXME type obj
  private static fromObject(obj): Movie {
    const m = new Movie();
    m.error = 200;
    // this will set all keys and values coming in through the object
    for (const key of Object.getOwnPropertyNames(obj)) {
      m[key] = obj[key];
    }
    return m;
  }

  /**
   * Creates a movie instance from the given Firebase data.
   * It is assumed, that the returned data is complete. Meaning that we do not additionally query for additional data as in Movie.fromTMDBMovieSearchResult.
   * @param obj the Firebase document representing a movie
   * @returns the movie instance
   */
  // FIXME type obj
  public static fromFirebaseObject(obj): Movie {
    return Movie.fromObject(obj);
  }

  /**
   * Creates a Movie instance from the given data that is coming from a TMDB query.
   * In comparison to Movie.fromFirebaseObject after calling this method the TheMovieDBService additionally queries data that is not included in the result
   * object.
   * @param result result from the The Movie DB api
   * @returns the movie instance
   */
  public static fromTMDBMovieSearchResult(result: IMovie): Movie {
    return Movie.fromObject(result);
  }

  /**
   * Generic function for different poster variants. Returns the URL to the poster image.
   * @param variant poster variant, one of: w92, w154, w185, w342, w500, w780, original
   * @returns url to the poster image on The Movie DB server
   */
  // FIXME returns an URL, rename it
  public getPosterImage(variant: string): string {
    if (this.poster_path !== null) {
      return environment.themoviedb.imageBaseURL + variant + '/' + this.poster_path;
    }
    return null;
  }

  /**
   * Returns an object representation of the movie.
   * This is mainly used for persisting the movie to Firebase. Here we decide, which properties will be persisted and which not.
   * @returns json string representing the given object
   */
  public toJSON(): object {
    const o = {};
    for (const key of Object.getOwnPropertyNames(this)) {
      if (key !== 'error') {
        o[key] = this[key];
      }
    }
    return o;
  }
}
