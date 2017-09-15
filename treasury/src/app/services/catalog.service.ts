import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';


@Injectable()
export class CatalogService {

  constructor(private authService: AuthService, private userService: UserService, private db: AngularFireDatabase) {

  }

  addMovie(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      this.db.object(`/catalog/${movie.id}`).subscribe(item => {
        if (!item.$exists()) {
          this.db.object(`/catalog/${movie.id}`).set(movie);
          //FIXME add to user list of movies
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

}
