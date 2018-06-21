import { Component, ComponentFactoryResolver } from '@angular/core';
import { FormControl } from '@angular/forms';



import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { BaseComponent } from '../base/base.component';
import { ErrorComponent } from '../error/error.component';
import { TheMovieDbService } from '../themoviedb/the-movie-db.service';
import { UserService } from '../services/user.service';
import { Movie } from '../themoviedb/movie';



@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent extends BaseComponent {

  results$: Observable<any>;
  movieControl: FormControl;
  addingItemsStatus = {}; // will keep the id of the item and the state, false meaning it's currently added and true means it was added

  constructor(private theMovieDbService: TheMovieDbService,
              private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super();
    // FIXME reimplement
    //this.movieControl = new FormControl();
    //this.results$ = this.movieControl.valueChanges.debounceTime(2000).switchMap(title => title ? theMovieDbService.getMovies(title) : []);
  }

  /**
   * When a found movie was clicked, try to add it to the user catalog.
   * @param {Movie} movie
   */
  addMovie(movie: Movie) {
    // mark item as currently being added - we wait for the firebase reply soon
    this.addingItemsStatus[movie.id] = false;
    // now we wait...
    this.userService.addMovie(movie).then(
      () => {
        // we got an answer and it was added, mark the item as added
        this.addingItemsStatus[movie.id] = true;
      },
      (error) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);
        this.displayErrorModal(
          componentFactory,
          'Error upon item addition',
          'An error occurred while adding the item. This may happened because the underlying TheMovieDB service returned an invalid response.',
          'Please refresh the page an try again!',
          error
        );
      }
    );
  }

  ngOnInit() {
  }

}
