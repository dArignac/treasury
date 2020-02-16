import { Injectable } from '@angular/core';
import { RequestTokenResponse } from './request-token-response';
import { HttpClient } from '@angular/common/http';
import { Requests } from '../config/requests';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private http: HttpClient) { }

  public async getResourceToken(): Promise<RequestTokenResponse> {
    return await this.http.get<RequestTokenResponse>(Requests.getURL('request_token'), {params: Requests.getBasicQueryParams()})
      .toPromise();
  }
}
