import { Component, OnInit } from '@angular/core';
import { TheMovieDbService } from '../the-movie-db/the-movie-db.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(
    private theMovieDbService: TheMovieDbService
  ) { }

  ngOnInit() {

  }

  public linkAccount() {
    // this.theMovieDbService.getResourceToken()
    //   .then(
    //     (tokenResponse) => {
    //       console.log(tokenResponse);
    //       // FIXME need to use domain name that points to localhost to bypass tmdb cloudfront
    //       // FIXME returned request contains queryparams resource_token=... & approved=true|false
    //       // FIXME need to setup a workflow with proper urls handling this
    //       window.location.href = 'https://www.themoviedb.org/authenticate/' + tokenResponse.request_token + '?redirect_to=http://localhost:4444/ratings/';
    //     }
    //   );
  }

}
