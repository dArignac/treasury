export class Movie {

  constructor(public id: number,  // references to themoviedb.org ID
              public title: string,
              public title_original: string,
              public release_date: string) {
  }
}
