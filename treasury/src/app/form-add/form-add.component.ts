import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { TheMovieDbService } from '../themoviedb/the-movie-db.service';
import { CatalogService } from '../services/catalog.service';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

  resultList: Observable<any>;
  movieControl: FormControl;

  constructor(private theMovieDbService: TheMovieDbService, private catalogService: CatalogService, public snackbar: MdSnackBar) {
    this.movieControl = new FormControl();
    this.resultList = this.movieControl.valueChanges.debounceTime(1000).switchMap(title => title ? theMovieDbService.getMovies(title): []);
  }

  /**
   * When a found movie was clicked, try to add it to the global and the user catalog.
   * @param item
   */
  buttonClicked(item) {
    this.catalogService.addMovie(item).then(wasAdded => {
      // if the movie was not added then it is already there
      let msg = wasAdded ? 'was added' : 'already exists';
      let config = new MdSnackBarConfig();
      config.duration = 30000;
      config.extraClasses = wasAdded ? ['snackbar', 'ok'] : ['snackbar', 'warning'];
      this.snackbar.open(`${item.title} ${msg}.`, undefined, config);
    });
  }

  ngOnInit() {
  }

}
