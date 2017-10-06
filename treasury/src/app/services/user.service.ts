import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private afs: AngularFirestore) {
  }

  /**
   * Adds the given movie to the catalog of the user.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if the movie was added, if not, an error occurred
   */
  addMovieToCatalog(movie: MovieResponseItem): Promise<boolean> {
    // create update object
    let key = `items.${movie.id}`;
    let update = {};
    update[key] = true;

    // update
    let promise = new Promise((resolve, reject) => {
      this.afs.collection<User>('users').doc(this.authService.id).update(update).then(
        () => {
          resolve();
        },
        (error) => {
          // FIXME add error handling
          console.log('error upon user item addition', error);
          reject();
        }
      );
    });
    return promise;
  }

}
