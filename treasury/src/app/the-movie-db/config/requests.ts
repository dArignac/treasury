import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class Requests {

  private static apiBaseURL = 'https://api.themoviedb.org/3/';

  /**
   * Returns the appropriate URL for the given section.
   * @param section name of the section
   * @param id the id of the movie
   * @returns the api url
   */
  static getURL(section: string, id?: number): string {
    let segment = '';
    switch (section) {
      case 'search_movie':
        segment = 'search/movie';
        break;
      case 'movie_credits':
        segment = 'movie/' + id + '/credits';
        break;
      case 'request_token':
        segment = '/authentication/token/new';
        break;
    }
    return this.apiBaseURL + segment;
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
