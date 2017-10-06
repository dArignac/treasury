import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';

import { User } from '../services/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private afs: AngularFirestore) {
  }

  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;

  ngOnInit() {
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();

    // this.itemDoc = this.afs.doc<User>(`users/${this.authService.id}`);
    // this.item = this.itemDoc.valueChanges();
  }

  buttonClicked() {
    console.log('button clicked');
    let u = <User>{
      id: this.authService.id,
      displayName: this.authService.user.displayName,
      email: this.authService.user.email,
      isEmailVerified: this.authService.user.emailVerified,
      photoURL: this.authService.user.photoURL,
      isCatalogPublic: false
    };
    this.userCollection.doc(this.authService.id).set(u).then(
    // this.userCollection.add(u).then(
      () => {
        console.log('user addition to collection done');
      },
      (error) => {
        console.log('error occured');
        console.log(error);
      });
    console.log('button clicked, done');
  }

}
