import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  userRecord: FirebaseObjectObservable<any>;
  private userRecordSubscription: any;

  constructor(private authService: AuthService, db: AngularFireDatabase) {
    // after user is fetched from auth...
    authService.user.subscribe(user => {
      if (user && user.uid) {
        // grab the record from the database - it can be empty!
        this.userRecord = db.object('/users/' + user.uid);
        // check if all initial values are set up
        this.userRecordSubscription = this.userRecord.subscribe(data => this.checkAndInitializeUserRecord(data));
      }
    });

    authService.isAuthenticated.subscribe(status => {
      // if logged out, remove subscriptions
      if (!status) {
        this.userRecordSubscription.unsubscribe();
      }
    });
  }

  /**
   * Initializes the user database record with the default values if they do not exist.
   * @param dataReturned data from database query
   */
  private checkAndInitializeUserRecord(dataReturned) {
    if (!dataReturned.hasOwnProperty('isCatalogPublic')) {
      this.userRecord.set({isCatalogPublic: false});
    }
  }

  setCatalogPublic() {
    this.userRecord.update({isCatalogPublic: true});
  }

  setCatalogPrivate() {
    this.userRecord.update({isCatalogPublic: false});
  }

}
