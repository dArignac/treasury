import { MdcSnackbar } from '@angular-mdc/web';
import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { Movie, MovieResponse } from '../the-movie-db/movies';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent extends BaseComponent {

  private movieCollection: AngularFirestoreCollection<MovieResponse>;
  public movies$: Observable<Movie[]>;

  constructor(
    public userService: UserService,
    private snackbar: MdcSnackbar
  ) {
    super();
  }

  /**
   * Returns the poster image of the given movie.
   * @param movie the movie to get the poster for
   * @returns URL to poster image
   */
  getPosterImage(movie: MovieResponse): string {
    return environment.themoviedb.imageBaseURL + 'w154/' + movie.poster_path;
  }

  /**
   * Removes the given movie from the user's collection.
   * @param movie movie to be removed
   */
  remove(movie: MovieResponse) {
    this.userService.removeMovie(movie).then(
      () => {
        // we do not handle the promise here as the element is removed immediately from the movie list that is observed
      },
      () => {
        // FIXME send to sentry
        this.snackbar.open(
          'An error occurred while removing the item. This may happened because the underlying TheMovieDB service returned an invalid response. '
          + 'Please refresh the page an try again!',
          'Close',
          this.getSnackbarConfig()
        );
      }
    );
  }

  ngOnInit() {
    this.movieCollection = this.userService.getMovieCollection();
    this.movies$ = this.movieCollection.valueChanges().pipe(
      map(Movie.fromFirebaseCollection),
      share()
    );
  }

}
