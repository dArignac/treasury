import { Injectable } from '@angular/core';
import { RequestTokenResponse } from './request-token-response';
import { HttpClient } from '@angular/common/http';
import { Requests } from '../config/requests';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbSessionService {

  constructor(private http: HttpClient) { }

  public async getResourceToken(): Promise<RequestTokenResponse> {
    return await this.http.get<RequestTokenResponse>(Requests.getURL('request_token'), { params: Requests.getBasicQueryParams() })
      .toPromise();
  }

  public triggerRequestTokenRetrieval() {
    this.getResourceToken()
      .then(
        (tokenResponse) => {
          window.location.href = 'https://www.themoviedb.org/authenticate/' + tokenResponse.request_token + '?redirect_to=http://treasury.local:4444/tmdb-token/';
        }
      );
    // window.location.href = 'https://www.themoviedb.org/authenticate/' + tokenResponse.request_token + '?redirect_to=http://localhost:4444/ratings/';
  }
}
