import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { MovieResponseItem } from '../themoviedb/movie-response-item';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  private movieCollection: AngularFirestoreCollection<MovieResponseItem>;
  private movies$: Observable<MovieResponseItem[]>;

  constructor(private userService: UserService, private authService: AuthService, private afs: AngularFirestore) {
  }

  getPostImage(item: MovieResponseItem): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + item.poster_path;
  }

  ngOnInit() {
    this.movieCollection = this.userService.getMovieCollection();
    this.movies$ = this.movieCollection.valueChanges();
  }

}
