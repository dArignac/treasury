import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { UserService } from './user.service';



@Injectable()
export class CatalogService {

  private _catalogDB: Subscription;

  private _userCatalog: MovieResponseItem[] = [];
  private _userCatalogSubject: BehaviorSubject<MovieResponseItem[]> = new BehaviorSubject([]);

  private _catalogIDs: number[] = []; // stores all ID of the elements in catalog (equivalent to the firebase catalog list of the user)
  private _catalogItems: MovieResponseItem[] = [];

  constructor(private authService: AuthService, private userService: UserService, private db: AngularFireDatabase) {
    this._catalogDB = db.list(`/users/${this.authService.id}/catalog`).subscribe(
      items => {
        // FIXME if items are added, save their IDs. If they are removed, remove the ids - base verythin on that
        // FIXME on addition/removal update a separate list with MovieResponseItems

        // dehydrate the sent items collection to an array only containing the $key values
        let firebaseIDs: number[] = _.flatMap(items, item => { return item.$key });

        // FIXME remove consoles
        console.log('firebaseIDs', firebaseIDs);
        console.log('catalogIDs',  this._catalogIDs);


        // calculate the difference between the IDs in firebase and our _catalogIDs
        let added = _.difference(firebaseIDs, this._catalogIDs);
        let removed = _.difference(this._catalogIDs, firebaseIDs);
        // FIXME remove consoles
        console.log('added', added);
        console.log('removed', removed);

        if (added.length > 0) {
          this._catalogIDs = this._catalogIDs.concat(added);
        }
        if (removed.length > 0) {
          this._catalogIDs = _.pullAll(this._catalogIDs, removed);
        }

        // // FIXME how is this considering performance?
        // this._userCatalog = [];
        // for (let item of items) {
        //   this.getItem(item.$key).first().subscribe(
        //     itemDetail => {
        //       this._userCatalog.push(itemDetail);
        //       this._userCatalogSubject.next(
        //         this._userCatalog.sort(
        //           (a, b) => {
        //             if (a.title < b.title) return -1;
        //             if (a.title > b.title) return 1;
        //             return 0;
        //           }
        //         )
        //       );
        //     }
        //   );
        // }
        // FIXME remove consoles
        console.log('--------------------------------------------------------------------------');
        console.log('catalog is', this._catalogIDs);
        console.log('###########################################################################');
      },
      // FIXME handle at least error
      // e => {
      //   console.log('error in fetching catalog', e);
      // },
      // () => {
      //   console.log('COMPLETED');
      // }
    );
  }

  get userCatalog(): Observable<MovieResponseItem[]> {
    return this._userCatalogSubject.filter(v => !!v);
  }

  getItem(id: string): FirebaseObjectObservable<MovieResponseItem> {
    return this.db.object(`/catalog/${id}`);
  }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      this.db.object(`/catalog/${movie.id}`).subscribe(item => {
        // if item does not exists in the global catalog, add it
        if (!item.$exists()) {
          this.db.object(`/catalog/${movie.id}`).set(movie);
        } else {
          // FIXME maybe update the existing item?
        }
        // add to user list of movies
        this.userService.addMovieToCatalog(movie).then(wasAdded => resolve(wasAdded));
      });
    });
    return promise;
  }

}
