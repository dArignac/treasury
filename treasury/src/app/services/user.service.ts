import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';

@Injectable()
export class UserService {

  constructor(private authService: AuthService) {
  }

  /**
   * Adds the given movie to the catalog of the user.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if the movie was added, if not, it already exists
   */
  addMovieToCatalog(movie: MovieResponseItem): Promise<boolean> {
    // FIXME rewrite to Firestore
    let promise = new Promise((resolve, reject) => {
      // this.db.object(`/users/${this.authService.id}/items/${movie.id}`).valueChanges().subscribe(item => {
      //   if (item == null) {
      //     // this.db.list(`/users/${this.authService.id}/items`).push({movie_id: true});
      //     this.db.object(`/users/${this.authService.id}/items/${movie.id}`).set(true);
      //     resolve(true);
      //   } else {
      //     resolve(false);
      //   }
      // });
    });
    return promise;
  }

}
