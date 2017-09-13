import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieResponse } from './movie-response';

@Injectable()
export class TheMovieDbService {

  private apiBaseURL;

  constructor(private http: HttpClient) {
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
    p = p.append('language', 'en-US'); // FIXME should be configurable
    p = p.append('query', title);
    p = p.append('page', '1'); // FIXME should be configurable
    p = p.append('include_adult', 'false'); // FIXME should be configurable
    return p;
  }

  /**
   * Searches for movies with the given title.
   * @param {string} title
   * @returns {Promise<any>}
   */
  async getMovies(title: string): Promise<any> {
    const response = await this.http.get<MovieResponse>(this.apiBaseURL + 'movie', {params: this.getMovieSearchParams(title)}).toPromise()
      .then(this.extractData)
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

      // sort by titles
      let results = response.results.sort(
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

      // transforms
      let values = [];
      for (let item of results) {
        values.push({
          id: item.id,
          title: item.title,
          year: item.release_date
        });
      }
      return values;
    }
    return [{title: 'No results found'}];
  }

  // FIXME test this
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

}
