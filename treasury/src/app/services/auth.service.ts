import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  private _user: firebase.User = null;
  isAuthenticated: Subject<boolean>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.isAuthenticated = new Subject();
    this.isAuthenticated.next(false);
    afAuth.authState.subscribe(user => {
      this.user = user;
      if (this.authenticated) {
        this.isAuthenticated.next(true);
      }
    });
  }

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return this._user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  /**
   * Log user in with Firebase Auth.
   */
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      response => {
        this.db.object(`/users/${response.user.uid}`)
          .subscribe(user => {
            if (!user.$exists()) {
              // data from firebase
              let {displayName, email, emailVerified, photoURL, uid} = response.user;
              // our custom initial data
              let isCatalogPublic = false;
              // store to db
              this.db.object(`/users/${response.user.uid}`).set({
                displayName,
                email,
                emailVerified,
                photoURL,
                uid,
                isCatalogPublic
              })
            }
          });
        this.router.navigate(['/catalog']);
      }
    );
  }

  /**
   * Log user out with Firebase Auth.
   */
  logout() {
    // notify subscribers about logout
    this.isAuthenticated.next(false);
    // logout from Firebase
    this.afAuth.auth.signOut().then(
      () => this.router.navigate(['/'])
    );
  }

}
