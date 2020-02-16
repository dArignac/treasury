import { Component, OnInit } from '@angular/core';
import { SessionService } from '../the-movie-db/authentication/session-service.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(
    private theMovieDbSessionService: SessionService
  ) { }

  ngOnInit() {

  }

  public linkAccount() {
    this.theMovieDbSessionService.triggerRequestTokenRetrieval();
  }

}
