import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Raven from 'raven-js';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {Movie} from './movie';
import {MovieCreditsResponse} from './credits/movie-credits-response';
import {MovieSearchResponse} from './movie-search-response';
import {UserService} from '../services/user.service';
import {MovieCreditsCrewResponse} from './credits/movie-credits-crew-response';
import {MovieCreditsCastResponse} from './credits/movie-credits-cast-response';

@Injectable()
export class TheMovieDbService {

  private apiBaseURL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  /**
   * Returns the appropriate URL for the given section.
   * @param section name of the section
   * @param id the id of the movie
   * @returns the api url
   */
  private getURL(section: string, id?: number): string {
    let segment = '';
    switch (section) {
      case 'search_movie':
        segment = 'search/movie';
        break;
      case 'movie_credits':
        segment = 'movie/' + id + '/credits';
    }
    return this.apiBaseURL + segment;
  }

  /**
   * Returns the basic query params necessary for every API call.
   * @returns HTTP params containing auth info
   */
  private getBasicQueryParams(): HttpParams {
    let p = new HttpParams();
    p = p.append('api_key', environment.themoviedb.apiKey);
    return p;
  }

  /**
   * Returns the query params for searching movies.
   * @param title title of the item to search for
   * @returns HTTP params with required values
   */
  private getMovieSearchQueryParams(title: string): HttpParams {
    let p = this.getBasicQueryParams();
    p = p.append('language', this.userService.userSettings.tmdbRegion.toLowerCase() || 'en');
    p = p.append('query', title);
    p = p.append('page', '1');
    p = p.append('include_adult', 'false');
    p = p.append('region', this.userService.userSettings.tmdbRegion || '');
    return p;
  }

  /**
   * Searches for movies with the given title.
   * @param title the title of the movie
   */
  public async getMovies(title: string): Promise<any> {
    const response = await this.http.get<MovieSearchResponse>(this.getURL('search_movie'), {params: this.getMovieSearchQueryParams(title)})
      .toPromise()
      .then(
        (queryResponse) => this.extractMoviesFromSearch(queryResponse),
        () => {
          return [{error: 500, title: 'Unable to communicate properly with The Movie DB API (1)'}];
        }
      )
      .then(
        (movies) => this.queryAdditionals(movies),
        () => {
          return [{error: 500, title: 'Unable to communicate properly with The Movie DB API (2)'}];
        }
      )
      .catch(this.handleErrorPromise);
    return response;
  }

  /**
   * Queries additional data for the given movies and returns the updated movie instance list.
   * @param movies the movies to query for
   * @returns the given movie list enhanced with credits info
   */
  private queryAdditionals(movies: any[]) {
    const originalCount = movies.length;
    let currentCount = 0;
    return new Promise((resolve, reject) => {
      if (movies.length > 0) {
        for (const movie of movies) {
          this.getMovieCredits(movie.id).then(
            (credits) => {
              movie.credits_actresses = this.getActresses(credits.cast);
              movie.credits_directors = this.getDirectors(credits.crew);
              currentCount++;
              if (currentCount === originalCount) {
                resolve(movies);
              }
            },
            (error) => {
              // we silently fail as this does not block the movie addition though some information is missing
              reject();
            }
          );
        }
      } else {
        // no search results, just return the empty list
        resolve(movies);
      }
    });
  }

  /**
   * Extracts the Movies from the returned response.
   * @param response the response from api
   * @returns mapped movies
   */
  private extractMoviesFromSearch(response: MovieSearchResponse): any[] {
    if (response.total_results > 0) {
      return response
        .results
        .map(Movie.fromTMDBMovieSearchResult)
        .sort(
          (n1, n2) => {
            if (n1.title > n2.title) {
              return 1;
            }
            if (n1.title < n2.title) {
              return -1;
            }
            return 0;
          }
        );
    }
    return [];
  }

  /**
   * Queries for the credits of the movie with the given id.
   * @param id the id of the move to query
   * @returns the credits
   */
  private async getMovieCredits(id: number): Promise<any> {
    const response = await this.http.get<MovieCreditsResponse>(this.getURL('movie_credits', id), {params: this.getBasicQueryParams()})
      .toPromise();
    return response;
  }

  /**
   * Extracts the top three actresses from the response object.
   * @param cast the response to a cast api query
   * @returns the three top actresses
   */
  private getActresses(cast: MovieCreditsCastResponse[]): string {
    // grab only the first 3 actresses
    return _.join(
      _.map(
        _.filter(
          cast,
          (human: MovieCreditsCastResponse) => human.order < 3
        ),
        'name'
      ),
      ', '
    );
  }

  /**
   * Extracts the directors from the response object.
   * @param crew the response to a crew api query
   * @returns the directors
   */
  private getDirectors(crew: MovieCreditsCrewResponse[]) {
    return _.join(
      _.map(
        _.filter(
          crew,
          (human: MovieCreditsCrewResponse) => human.department === 'Directing' && human.job === 'Director'
        ),
        'name'
      ),
      ', '
    );
  }

  private handleErrorPromise(error: Response | any) {
    Raven.captureException(error); // send error to sentry - maybe is already covered through default error handler?
    return Promise.reject(error.message || error || null);
  }

}
