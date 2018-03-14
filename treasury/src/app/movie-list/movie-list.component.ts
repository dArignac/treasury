import { Component, ComponentFactoryResolver } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { ErrorComponent } from '../error/error.component';
import { IMovie } from '../themoviedb/imovie';
import { Movie } from '../themoviedb/movie';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent extends BaseComponent {

  private movieCollection: AngularFirestoreCollection<IMovie>;
  public movies$: Observable<Movie[]>;

  constructor(public userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  /**
   * Returns the poster image of the given movie.
   * @param {IMovie} movie
   * @returns {string}
   */
  getPosterImage(movie: IMovie): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + movie.poster_path;
  }

  /**
   * Removes the given movie from the user's collection.
   * @param {IMovie} movie
   */
  remove(movie: IMovie) {
    this.userService.removeMovie(movie).then(
      () => {
        // we do not handle the promise here as the element is removed immediately from the movie list that is observed
      },
      (error) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);
        this.displayErrorModal(
          componentFactory,
          'Error upon item removal',
          'An error occurred while removing the item. This may happened because the underlying TheMovieDB service returned an invalid response.',
          'Please refresh the page an try again!',
          error
        );
      }
    );
  }

  ngOnInit() {
    this.movieCollection = this.userService.getMovieCollection();
    this.movies$ = this.movieCollection.valueChanges().map(Movie.fromFirebaseCollection).share();
  }

}
