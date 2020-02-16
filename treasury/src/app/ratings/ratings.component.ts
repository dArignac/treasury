import { Component, OnInit } from '@angular/core';
import { TheMovieDbSessionService } from '../the-movie-db/authentication/session-service.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(
    private theMovieDbSessionService: TheMovieDbSessionService
  ) { }

  ngOnInit() {

  }

  public linkAccount() {
    this.theMovieDbSessionService.triggerRequestTokenRetrieval();
  }

}
