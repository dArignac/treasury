import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  private _user: firebase.User = null;
  isAuthenticated: Subject<boolean>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
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
        const currentUser = <User>{
          displayName: response.user.displayName,
          email: response.user.email,
          isEmailVerified: response.user.emailVerified,
          photoURL: response.user.photoURL
        };
        this.afs.collection<User>('users').doc(response.user.uid).set(currentUser).then(
          () => {
            this.router.navigate(['/movies']);
          },
          (error) => {
            // redirect to default error page
            this.router.navigate(['/error']);
          }
        );
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
