import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { TheMovieDbService } from '../themoviedb/the-movie-db.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  resultList: Observable<any>;
  movieControl: FormControl;

  constructor(private theMovieDbService: TheMovieDbService, private userService: UserService) {
    this.movieControl = new FormControl();
    this.resultList = this.movieControl.valueChanges.debounceTime(1000).switchMap(title => title ? theMovieDbService.getMovies(title): []);
  }

  /**
   * When a found movie was clicked, try to add it to the global and the user catalog.
   * @param item
   */
  buttonClicked(item) {
    if (!item.hasOwnProperty('error')) {
      this.userService.addMovie(item).then(
        () => {
          // FIXME handle appropriately
          console.log('item was added:', item);
        },
        (error) => {
          // FIXME add error handling
          console.log('error upon item addition', error);
        }
      );
    }
  }

  ngOnInit() {
  }

}
