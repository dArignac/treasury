import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  userRecord: FirebaseObjectObservable<any>;
  // private userRecordSubscription: any;

  constructor(private authService: AuthService, db: AngularFireDatabase) {
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

}
