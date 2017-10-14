import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { TheMovieDbService } from '../themoviedb/the-movie-db.service';
import { UserService } from '../services/user.service';
import { Movie } from '../themoviedb/movie';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  results$: Observable<any>;
  movieControl: FormControl;
  addingItemsStatus = {}; // will keep the id of the item and the state, false meaning it's currently added and true means it was added

  constructor(private theMovieDbService: TheMovieDbService, private userService: UserService) {
    this.movieControl = new FormControl();
    this.results$ = this.movieControl.valueChanges.debounceTime(1000).switchMap(title => title ? theMovieDbService.getMovies(title) : []);
  }

  /**
   * When a found movie was clicked, try to add it to the global and the user catalog.
   * @param item
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
        // FIXME add error handling
        console.log('error upon item addition', error);
      }
    );
  }

  ngOnInit() {
  }

}
