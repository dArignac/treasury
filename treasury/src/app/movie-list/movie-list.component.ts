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
  public movies$: Observable<Movie[]>;

  constructor(private userService: UserService) {
  }

  /**
   * Returns the poster image of the given movie.
   * @param {Movie} movie
   * @returns {string}
   */
  getPosterImage(movie: Movie): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + movie.poster_path;
  }

  /**
   * Removes the given movie from the user's collection.
   * @param {Movie} movie
   */
  remove(movie: Movie) {
    // we do not handle the promise here as the element is removed immediately from the movie list that is observedś
    this.userService.removeMovie(movie);
  }

  ngOnInit() {
    this.movieCollection = this.userService.getMovieCollection();
    this.movies$ = this.movieCollection.valueChanges();
  }

}
