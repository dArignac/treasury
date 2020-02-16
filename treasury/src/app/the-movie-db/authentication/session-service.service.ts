import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Requests, TheMovieDbURL } from '../config';
import { RequestTokenResponse } from './request-token-response';
import { SessionResponse } from './session-response';
import { SessionRequest } from './session-request';

// FIXME is missing error cases in requests

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  private async getResourceToken(): Promise<RequestTokenResponse> {
    return await this.http.get<RequestTokenResponse>(
      Requests.getURL(TheMovieDbURL.AuthenticationRequestTokenCreate),
      { params: Requests.getBasicQueryParams() }
    ).toPromise();
  }

  public triggerRequestTokenRetrieval() {
    this.getResourceToken()
      .then(
        (tokenResponse) => {
          window.location.href = 'https://www.themoviedb.org/authenticate/' + tokenResponse.request_token + '?redirect_to=' + window.location.origin + '/tmdb-token/';
        }
      );
  }

  // FIXME should store session to firebase
  // FIXME handle errors like {"failure":true,"status_code":17,"status_message":"Session denied."}
  public async getNewSession(sessionRequest: SessionRequest): Promise<SessionResponse> {
    return await this.http.post<SessionResponse>(
      Requests.getURL(TheMovieDbURL.AuthenticationSessionCreate),
      sessionRequest,
      { params: Requests.getBasicQueryParams() }
    ).toPromise();
  }
}
