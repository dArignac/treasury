import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TheMovieDbURL } from './urls';

export class Requests {

  private static apiBaseURL = 'https://api.themoviedb.org/3';

  /**
   * Returns the appropriate URL for the given section.
   * @param section name of the section
   * @param id the id of the movie
   * @returns the api url
   */
  static getURL(url: TheMovieDbURL, id?: number): string {
    let theURL = url + '';
    // check id for necessary urls
    switch (url) {
      case TheMovieDbURL.MovieCredits:
        if (id === undefined) {
          return undefined;
        } else {
          if (id <= 0) {
            return undefined;
          }
        }
        break;
    }
    // replace id for necessary urls
    switch (url) {
      case TheMovieDbURL.MovieCredits:
        theURL = url.replace('{ID}', id + '');
        break;
    }
    return this.apiBaseURL + theURL;
  }

  /**
   * Returns the basic query params necessary for every API call.
   * @returns HTTP params containing auth info
   */
  static getBasicQueryParams(): HttpParams {
    let p = new HttpParams();
    p = p.append('api_key', environment.themoviedb.apiKey);
    return p;
  }

}
