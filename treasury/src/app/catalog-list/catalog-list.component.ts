import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { CatalogService } from '../services/catalog.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  //catalog$: Observable<MovieResponseItem[]>;
  // catalogItemIDs$: BehaviorSubject<number[]>;
  private movieCollection: AngularFirestoreCollection<MovieResponseItem>;
  private movies$: Observable<MovieResponseItem[]>;

  constructor(private catalogService: CatalogService, private afs: AngularFirestore) {
  }

  getPostImage(item: MovieResponseItem): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + item.poster_path;
  }

  ngOnInit() {
    //this.catalog$ = this.catalogService.userCatalog;
    // this.catalogItemIDs$ = this.catalogService.catalogItemIDsBS;
    // FIXME this does not use the user's movies
    this.movieCollection = this.afs.collection<MovieResponseItem>('items');
    this.movies$ = this.movieCollection.valueChanges();
  }

}
