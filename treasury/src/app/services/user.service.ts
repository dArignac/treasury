import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { IMovie } from '../themoviedb/imovie';
import { Movie } from '../themoviedb/movie';
import { User } from './user';

@Injectable()
export class UserService {

  private userDoc: AngularFirestoreDocument<User>;
  user$: Observable<User>;
  user: User;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.userDoc = this.afs.collection<User>('users').doc(this.authService.id);
          this.user$ = this.userDoc.valueChanges();
          this.user$.subscribe(user => this.user = user);
        }
      }
    );
  }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {Movie} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: Movie): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userDoc.collection('movies').doc(String(movie.id)).set(movie.toJSON()).then(
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
  }

  /**
   * Removes the given movie from the user's collection.
   * @param {IMovie} movie
   * @returns {Promise<boolean>}
   */
  removeMovie(movie: IMovie): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userDoc.collection('movies').doc(String(movie.id)).delete().then(
        () => {
          resolve();
        },
        (error) => {
          // FIXME add error handling
          console.log('error upon user item removal', error);
          reject();
        }
      );
    });
  }

  /**
   * Returns the movie collection of the current user.
   * It's sorted by title.
   * @returns {AngularFirestoreCollection<IMovie>}
   */
  getMovieCollection(): AngularFirestoreCollection<IMovie> {
    return this.afs.collection<User>('users')
      .doc(this.authService.id)
      .collection(
        'movies',
        ref => ref.orderBy('title')
      );
  }

  setUserProperty(key: string, value: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let user = this.user;
      user[key] = value;
      this.userDoc.update(user).then(
        () => {
          resolve();
        },
        (error) => {
          // FIXME handle error
          console.log('error upon setting property ' + key + ' with value ' + value + ' to user document.');
          console.log(error);
          reject();
        }
      )
    });
  }

}
