import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { Movie } from '../themoviedb/movie';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  private movieCollection: AngularFirestoreCollection<Movie>;
  private movies$: Observable<Movie[]>;

  constructor(private userService: UserService) {
  }

  getPostImage(item: Movie): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + item.poster_path;
  }

  ngOnInit() {
    this.movieCollection = this.userService.getMovieCollection();
    this.movies$ = this.movieCollection.valueChanges();
  }

}
