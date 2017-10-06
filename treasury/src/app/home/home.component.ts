import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';

import * as firebase from 'firebase/app';

import { User } from '../services/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;

  ngOnInit() {
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();

    // this.itemDoc = this.afs.doc<User>('users/1');
    // this.item = this.itemDoc.valueChanges();
  }

  buttonClicked() {
    console.log('button clicked');
    const id = this.afs.createId();
    let u = <User>{id: id, displayName: 'Anna'};
    // this.itemDoc.update(u).then(() => {
    //   console.log('user was updated');
    // });
    this.userCollection.add(u).then(a => {
      console.log('user addition to collection done');
      console.log(a);
    });
    console.log('button clicked, done');
  }

}
