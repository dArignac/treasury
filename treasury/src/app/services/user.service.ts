import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { IMovie } from '../themoviedb/imovie';
import { Movie } from '../themoviedb/movie';
import { User } from './user';
import { UserSettings } from './user-settings';
import { UserCounters } from './user-counters';
import { isNull } from 'util';

@Injectable()
export class UserService {

  private userDoc: AngularFirestoreDocument<User>;
  private userSettingsDoc: AngularFirestoreDocument<UserSettings>;
  public userCountersDoc: AngularFirestoreDocument<UserCounters>;
  user$: Observable<User>;
  userSettings$: Observable<UserSettings>;
  userCounters$: Observable<UserCounters>;
  user: User;
  userSettings: UserSettings;
  userCounters: UserCounters;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        // if authenticated successfully...
        if (isAuthenticated) {
          // ...subscribe to the user document
          this.userDoc = this.afs.collection<User>('users').doc(this.authService.id);
          this.user$ = this.userDoc.valueChanges();
          this.user$.subscribe(user => this.user = user);

          // ...subscribe to the user settings document
          this.userSettingsDoc = this.afs.collection<UserSettings>('settings').doc(this.authService.id);
          this.userSettings$ = this.userSettingsDoc.valueChanges();
          this.userSettings$.subscribe(
            (userSettings) => {
              // if initial document does not exist, create it with default values
              if (isNull(userSettings)) {
                userSettings = {
                  isCatalogPublic: false,
                  tmdbRegion: 'EN'
                };
                this.afs.collection<UserSettings>('settings').doc(this.authService.id).set(userSettings);
              }
              this.userSettings = userSettings;
            }
          );

          // ..subscribe to the user counter document
          this.userCountersDoc = this.afs.collection<UserCounters>('counters').doc(this.authService.id);
          this.userCounters$ = this.userCountersDoc.valueChanges();
          this.userCounters$.subscribe(counters => this.userCounters = counters);
        }
      }
    );
  }

  /**
   * Adds the given movie to the current user's catalog.
   * @param {Movie} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: Movie): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userDoc.collection('movies').doc(String(movie.id)).set(movie.toJSON()).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
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
          reject(error);
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

  /**
   * Updates a user settings in the separate "settings" collection.
   * @param key the key to user
   * @param value the value to set
   */
  setUserSetting(key: string, value: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const settings = this.userSettings;
      settings[key] = value;
      this.userSettingsDoc.update(settings).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
