import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionRequest } from '../session-request';
import { SessionService } from '../session-service.service';

export enum TokenStatus {
  Invalid, // query params not matched
  Unapproved, // approved=false
  Valid, // approved=true and a token
  Unkown // anything else
}

@Component({
  selector: 'app-the-movie-db-token-return',
  templateUrl: './token-return.component.html',
  styleUrls: ['./token-return.component.scss']
})
// FIXME rename
export class TheMovieDbTokenReturnComponent implements OnInit {

  tokenStatuses = TokenStatus;
  currentTokenStatus = TokenStatus.Unkown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ('request_token' in params && 'approved' in params) {
        if (params.approved === 'false') {
          this.currentTokenStatus = TokenStatus.Unapproved;
        } else if (params.approved === 'true') {
          // FIXME redirect if session was gathered correctly
          // FIXME sessionService should only return success
          const sessionRequest: SessionRequest = {request_token: params.request_token};
          this.sessionService.getNewSession(sessionRequest).then(
            (resp) => console.log(resp)
          );
        }
      } else {
        this.currentTokenStatus = TokenStatus.Invalid;
      }
    });
  }

}
