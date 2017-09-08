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

  stateCtrl: FormControl;
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
    this.stateCtrl = new FormControl();
    this.filteredMovies = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.movies.slice());
  }

  filterStates(name: string) {
    console.log(name);
    return this.movies.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
  }

}
