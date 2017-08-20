import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  isAuthenticated: Subject<boolean>;

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.isAuthenticated = new Subject();
    this.isAuthenticated.next(false);
    this.user.subscribe(user => {
      if (user && user.uid) {
        this.isAuthenticated.next(true);
      }
    });
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
    // notify subscribers about logout
    this.isAuthenticated.next(false);
    // logout from Firebase
    this.afAuth.auth.signOut();
  }

}
