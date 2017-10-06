import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { AngularFireObject } from 'angularfire2/database';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { UserService } from './user.service';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class CatalogService {

  private _catalogDB: Subscription;

  private _catalogItemIDsBS: BehaviorSubject<number[]> = new BehaviorSubject([]);

  private _catalogItemIDs: number[] = []; // stores all ID of the elements in catalog (equivalent to the firebase catalog list of the user)
  private _catalogItems: MovieResponseItem[] = [];
  private _isCatalogInitialized = false;

  get catalogItemIDsBS(): BehaviorSubject<number[]> {
    return this._catalogItemIDsBS;
  }

  get isCatalogInitialized(): boolean {
    return this._isCatalogInitialized;
  }

  constructor(private authService: AuthService, private userService: UserService, private afs: AngularFirestore) {
    // FIXME rewrite to Firestore
    /*
    this._catalogDB = db.list(`/users/${this.authService.id}/items`).snapshotChanges().map(
      // dehydrate the sent items collection to an array only containing the key
      // FIXME we could store <key>:<key> instead of <key>:true to the /items tree and skip this and use valueChanges() without .map()
      items => {
        return _.flatMap(items, item => { return Number(item.key); });
      }
    ).subscribe(
      itemKeys => {
        // FIXME if items are added, save their IDs. If they are removed, remove the ids - base everything on that
        // FIXME on addition/removal update a separate list with MovieResponseItems

        // FIXME remove consoles
        console.log('itemKeys', itemKeys);
        console.log('catalogIDs',  this._catalogItemIDs);

        // calculate the difference between the IDs in firebase and our _catalogIDs
        let added = _.difference(itemKeys, this._catalogItemIDs);
        let removed = _.difference(this._catalogItemIDs, itemKeys);

        // FIXME remove consoles
        console.log('added', added);
        console.log('removed', removed);

        if (added.length > 0) {
          this._catalogItemIDs = this._catalogItemIDs.concat(added);
        }
        if (removed.length > 0) {
          this._catalogItemIDs = _.pullAll(this._catalogItemIDs, removed);
        }

        this._catalogItemIDsBS.next(this._catalogItemIDs);
        this._isCatalogInitialized = true;

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
        console.log('catalog is', this._catalogItemIDs);
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
    */
  }

  // get userCatalog(): Observable<MovieResponseItem[]> {
  //   return this._userCatalogSubject.filter(v => !!v);
  // }

  // FIXME do something
  // getItem(id: string): FirebaseObjectObservable<MovieResponseItem> {
  //   return this.db.object(`/catalog/${id}`);
  // }

  /**
   * Adds the given movie to the global catalog and to the current user's catalog.
   * @param {MovieResponseItem} movie
   * @returns {Promise<boolean>} if it was added ot the user catalog, if not, it already exists
   */
  addMovie(movie: MovieResponseItem): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      this.afs.collection<MovieResponseItem>('items').doc(String(movie.id)).set(movie).then(
        () => {
          this.userService.addMovieToCatalog(movie).then(
            () => {
              resolve();
            }
          );
        },
        (error) => {
          // FIXME error handling
          console.log('error occurred', error);
          reject();
        }
      );
    });
    return promise;
  }

}
