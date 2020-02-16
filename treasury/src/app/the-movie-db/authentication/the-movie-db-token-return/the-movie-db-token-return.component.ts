import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-the-movie-db-token-return',
  templateUrl: './the-movie-db-token-return.component.html',
  styleUrls: ['./the-movie-db-token-return.component.scss']
})
export class TheMovieDbTokenReturnComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });
  }

}
