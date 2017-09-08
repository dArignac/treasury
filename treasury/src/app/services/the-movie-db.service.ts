import { Injectable } from '@angular/core';

@Injectable()
export class TheMovieDbService {

  constructor() { }

  getMovies(title: string): any[] {
    return [{name: title, year: 1970}];
  }

}
