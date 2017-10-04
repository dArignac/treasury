import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';

@Injectable()
export class UserService {

  userRecord: AngularFireObject<any>;

  // private userRecordSubscription: any;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    authService.isAuthenticated.subscribe(
      authenticated => {
        if (authenticated) {
          this.userRecord = db.object('/users/' + authService.id);
          // FIXME do we need a subscription on the user data?
          // this.userRecordSubscription = this.userRecord.subscribe(data => this.checkAndInitializeUserRecord(data));
        } else {
          // this.userRecordSubscription.unsubscribe();
        }
      }
    );
  }

  setCatalogPublic() {
    this.userRecord.update({isCatalogPublic: true});
  }

  setCatalogPrivate() {
    this.userRecord.update({isCatalogPublic: false});
  }

  /**
   * Adds the given movie to the catalog of the user.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if the movie was added, if not, it already exists
   */
  addMovieToCatalog(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      this.db.object(`/users/${this.authService.id}/items/${movie.id}`).valueChanges().subscribe(item => {
        if (item == null) {
          // this.db.list(`/users/${this.authService.id}/items`).push({movie_id: true});
          this.db.object(`/users/${this.authService.id}/items/${movie.id}`).set(true);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

}
