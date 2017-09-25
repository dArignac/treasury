import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { UserService } from './user.service';


@Injectable()
export class CatalogService {

  private _userCatalog: MovieResponseItem[] = [];
  private _userCatalogSubject: BehaviorSubject<MovieResponseItem[]> = new BehaviorSubject([]);

  constructor(private authService: AuthService, private userService: UserService, private db: AngularFireDatabase) {
    db.list(`/users/${this.authService.id}/catalog`).subscribe(
      items => {
        // FIXME is this performant?
        this._userCatalog = [];
        for (let item of items) {
          this.getItem(item.$key).first().subscribe(
            itemDetail => {
              this._userCatalog.push(itemDetail);
              this._userCatalogSubject.next(this._userCatalog);
            }
          );
        }
      }
    );
  }

  get userCatalog(): Observable<MovieResponseItem[]> {
    return this._userCatalogSubject.asObservable();
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
