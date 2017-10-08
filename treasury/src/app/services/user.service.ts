import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthService } from './auth.service';
import { Movie } from '../themoviedb/movie';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private afs: AngularFirestore) {
  }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {Movie} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: Movie): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
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

  /**
   * Returns the movie collection of the current user.
   * It's sorted by title.
   * @returns {AngularFirestoreCollection<Movie>}
   */
  getMovieCollection(): AngularFirestoreCollection<Movie> {
    return this.afs.collection<User>('users')
      .doc(this.authService.id)
      .collection(
        'movies',
        ref => ref.orderBy('title')
      );
  }

  setLanguage(identifier: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // FIXME implement
      resolve(true);
    });
  }

}
