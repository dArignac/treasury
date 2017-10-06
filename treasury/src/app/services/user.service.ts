import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private afs: AngularFirestore) {
  }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      this.afs.collection<User>('users').doc(this.authService.id).collection('movies').doc(String(movie.id)).set(movie).then(
        () => {
          // FIXME handle addition properly
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

  getMovieCollection(): AngularFirestoreCollection<MovieResponseItem> {
    return this.afs.collection<User>('users').doc(this.authService.id).collection('movies');
  }

}
