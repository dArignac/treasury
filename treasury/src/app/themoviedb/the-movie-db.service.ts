import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as Raven from 'raven-js';

import { environment } from '../../environments/environment';
import { MovieResponse } from './movie-response';
import { UserService } from '../services/user.service';
import { Movie } from './movie';

@Injectable()
export class TheMovieDbService {

  private apiBaseURL;

  constructor(private http: HttpClient, private userService: UserService) {
    this.apiBaseURL = 'https://api.themoviedb.org/3/search/';
  }

  /**
   * Prepare the API HTTP query.
   * @param {string} title
   * @returns {HttpParams}
   */
  getMovieSearchParams(title: string): HttpParams {
    let p = new HttpParams();
    p = p.append('api_key', environment.themoviedb.apiKey);
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
  async getMovies(title: string): Promise<any> {
    const response = await this.http.get<MovieResponse>(this.apiBaseURL + 'movie', {params: this.getMovieSearchParams(title)}).toPromise()
      .then(
        (response) => this.extractData(response),
        () => {
          return [{error: 500, title: 'Unable to communicate properly with The IMovie DB API...'}];
        }
      )
      .catch(this.handleErrorPromise);
    return response;
  }

  /**
   * Extracts the relevant data from the returned response.
   * @param {MovieResponse} response
   * @returns {any}
   */
  extractData(response: MovieResponse) {
    if (response.total_results > 0) {

      let results = [];
      for (let item of response.results) {
        results.push(Movie.fromResponse(item));
      }

      // sort by titles
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

  private handleErrorPromise(error: Response | any) {
    Raven.captureException(error); // send error to sentry - maybe is already covered through default error handler?
    return Promise.reject(error.message || error);
  }

}
