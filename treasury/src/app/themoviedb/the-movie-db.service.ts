import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { MovieResponse } from "./movie-response";

@Injectable()
export class TheMovieDbService {

  private apiBaseURL;

  constructor(private http: HttpClient) {
    this.apiBaseURL = 'https://api.themoviedb.org/3/search/';
  }

  getMovieSearchParams(title: string): HttpParams {
    // api_key=0b65263d0ba37063fa8c01afb267050c&language=en-US&query=the%20mentalist&page=1&include_adult=false
    let p = new HttpParams();
    p = p.append('api_key', environment.themoviedb.apiKey);
    p = p.append('language', 'en-US'); // FIXME should be configurable
    p = p.append('query', title);
    p = p.append('page', '1'); // FIXME should be configurable
    p = p.append('include_adult', 'false'); // FIXME should be configurable
    return p;
  }

  getMovies(title: string): any[] {
    // see https://developers.themoviedb.org/3/search/search-movies
    // FIXME request result is not synchron, how to handle?
    this.http.get<MovieResponse>(this.apiBaseURL + 'movie', {params: this.getMovieSearchParams(title)}).subscribe(data => {
      // FIXME handle
      console.log(data);
    });
    return [{name: title, year: 1970}];
  }

}
