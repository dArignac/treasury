import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { TheMovieDbService } from "../themoviedb/the-movie-db.service";


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  movieControl: FormControl;
  filteredMovies: Observable<any[]>;

  constructor(private theMovieDbService: TheMovieDbService) {
    this.movieControl = new FormControl();
    this.filteredMovies = this.movieControl.valueChanges
      .debounceTime(1000)
      .startWith(null)
      .switchMap(title => title ? theMovieDbService.getMovies(title): []);
  }

  ngOnInit() {
  }

}
