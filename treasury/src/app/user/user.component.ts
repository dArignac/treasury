import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Observable<firebase.User>;
  userRecord: FirebaseObjectObservable<any>;
  userRecordSubscription: any;

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;

    // after user is fetched from auth...
    this.user.subscribe(user => {
      if (user && user.uid) {
        // grab the record from the database - it can be empty!
        this.userRecord = db.object("/users/" + user.uid);
        // check if all initial values are set up
        this.userRecordSubscription = this.userRecord.subscribe(data => this.checkAndInitializeUserRecord(data));
      }
    });
  }

  /**
   * Initializes the user database record with the default values if they do not exist.
   * @param dataReturned data from database query
   */
  private checkAndInitializeUserRecord(dataReturned) {
    if (!dataReturned.hasOwnProperty("isCatalogPublic")) {
      this.userRecord.set({isCatalogPublic: false});
    }
  }

  ngOnInit() {
  }

  /**
   * Log user in with Firebase Auth.
   */
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * Log user out with Firebase Auth.
   */
  logout() {
    this.userRecordSubscription.unsubscribe();
    this.afAuth.auth.signOut();
  }

}
