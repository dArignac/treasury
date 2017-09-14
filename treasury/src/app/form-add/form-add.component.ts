import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TheMovieDbService } from '../themoviedb/the-movie-db.service';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  movieControl: FormControl;

  constructor(private theMovieDbService: TheMovieDbService) {
    this.movieControl = new FormControl();
    this.movieControl.valueChanges.debounceTime(1000).subscribe(
      title => console.log(title)
    );
  }

  ngOnInit() {
  }

}
