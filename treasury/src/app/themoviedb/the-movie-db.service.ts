import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as Raven from 'raven-js';

import { environment } from '../../environments/environment';
import { Movie } from './movie';
import { MovieCreditsResponse } from './credits/movie-credits-response';
import { MovieSearchResponse } from './movie-search-response';
import { UserService } from '../services/user.service';

@Injectable()
export class TheMovieDbService {

  private apiBaseURL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  /**
   * Returns the appropriate URL for the given section.
   * @param {string} section
   * @param id {number} id
   * @returns {string}
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
   * @returns {HttpParams}
   */
  private getBasicQueryParams(): HttpParams {
    let p = new HttpParams();
    p = p.append('api_key', environment.themoviedb.apiKey);
    return p;
  }

  /**
   * Returns the query params for searching movies.
   * @param {string} title
   * @returns {HttpParams}
   */
  private getMovieSearchQueryParams(title: string): HttpParams {
    let p = this.getBasicQueryParams();
    p = p.append('language', this.userService.user.tmdbRegion.toLowerCase() || 'en');
    p = p.append('query', title);
    p = p.append('page', '1');
    p = p.append('include_adult', 'false');
    p = p.append('region', this.userService.user.tmdbRegion || '');
    return p;
  }

  /**
   * Searches for movies with the given title.
   * @param {string} title
   * @returns {Promise<any>}
   */
  public async getMovies(title: string): Promise<any> {
    const response = await this.http.get<MovieSearchResponse>(this.getURL('search_movie'),{params: this.getMovieSearchQueryParams(title)})
      .toPromise()
      .then(
        (response) => this.extractMovies(response),
        () => {
          return [{error: 500, title: 'Unable to communicate properly with The IMovie DB API...'}];
        }
      )
      .catch(this.handleErrorPromise);
    return response;
  }

  /**
   * Extracts the Movies from the returned response.
   * @param {MovieSearchResponse} response
   * @returns {any}
   */
  private extractMovies(response: MovieSearchResponse) {
    if (response.total_results > 0) {

      let results = response.results.map(Movie.fromTMDBMovieSearchResult);

      // sort by titles
      // FIXME maybe we create our own implementation of the Movie list and implement the sorting there
      results = results.sort(
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

      return results;
    }
    return [{error: 404, title: 'No results found'}];
  }

  /**
   * Queries for the credits of the movie with the given id.
   * @param {number} id
   * @returns {Promise<any>}
   */
  public async getMovieCredits(id: number): Promise<any> {
    const response = await this.http.get<MovieCreditsResponse>(this.getURL('movie_credits', id),{params: this.getBasicQueryParams()})
      .toPromise()
    return response;
  }

  private handleErrorPromise(error: Response | any) {
    Raven.captureException(error); // send error to sentry - maybe is already covered through default error handler?
    return Promise.reject(error.message || error);
  }

}
