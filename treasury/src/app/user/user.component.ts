import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    // this.user.subscribe(res => {
    //   if (res && res.uid) {
    //     console.log('user is logged in');
    //     res.providerData.forEach(
    //       function (profile) {
    //         console.log("Sign-in provider: " + profile.providerId);
    //         console.log("  Provider-specific UID: " + profile.uid);
    //         console.log("  Name: " + profile.displayName);
    //         console.log("  Email: " + profile.email);
    //         console.log("  Photo URL: " + profile.photoURL);
    //       }
    //     );
    //   } else {
    //     console.log('user not logged in');
    //   }
    // });
  }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
