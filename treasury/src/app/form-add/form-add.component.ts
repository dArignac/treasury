import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { TheMovieDbService } from '../themoviedb/the-movie-db.service';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  resultList: Observable<any>;
  movieControl: FormControl;

  // FIXME check if found result is already in user catalog

  constructor(private theMovieDbService: TheMovieDbService) {
    this.movieControl = new FormControl();
    this.resultList = this.movieControl.valueChanges.debounceTime(1000).switchMap(title => title ? theMovieDbService.getMovies(title): []);
  }

  // FIXME implement
  buttonClicked(item) {
    console.log('clicked', item);
  }

  ngOnInit() {
  }

}
