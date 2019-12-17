import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  private firebaseUser: firebase.User = null;
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
    return this.firebaseUser;
  }

  set user(value: firebase.User) {
    this.firebaseUser = value;
  }

  get authenticated(): boolean {
    return this.firebaseUser !== null;
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
        this.afs.collection<{}>('users').doc(response.user.uid).set({}).then(
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
