import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CatalogService } from '../services/catalog.service';
import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  //catalog$: Observable<MovieResponseItem[]>;
  catalogItemIDs$: BehaviorSubject<number[]>;

  constructor(private catalogService: CatalogService) {
  }

  getPostImage(item: MovieResponseItem): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + item.poster_path;
  }

  ngOnInit() {
    //this.catalog$ = this.catalogService.userCatalog;
    this.catalogItemIDs$ = this.catalogService.catalogItemIDsBS;
  }

}
