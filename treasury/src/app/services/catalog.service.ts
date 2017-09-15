import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';


@Injectable()
export class CatalogService {

  constructor(private authService: AuthService, private userService: UserService, private db: AngularFireDatabase) {

  }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      this.db.object(`/catalog/${movie.id}`).subscribe(item => {
        // if item does not exists in the global catalog, add it
        if (!item.$exists()) {
          this.db.object(`/catalog/${movie.id}`).set(movie);
        } else {
          // FIXME maybe update the existing item?
        }
        // add to user list of movies
        this.userService.addMovieToCatalog(movie).then(wasAdded => resolve(wasAdded));
      });
    });
    return promise;
  }

}
