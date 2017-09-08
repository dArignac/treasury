import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  movieControl: FormControl;
  filteredMovies: Observable<any[]>;

  movies: any[] = [
    {
      name: 'The Big Lebowski',
      year: '2003',
    },
    {
      name: 'Taken',
      year: '2008',
    },
    {
      name: 'Rambo',
      year: '1987',
    },
    {
      name: 'The Expendables',
      year: '2014',
    }
  ];

  constructor() {
    this.movieControl = new FormControl();
    this.filteredMovies = this.movieControl.valueChanges
      .debounceTime(1000)
      .startWith(null)
      .map(movie => movie ? this.filterMovies(movie) : []);
  }

  filterMovies(name: string) {
    return this.movies.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
  }

}
