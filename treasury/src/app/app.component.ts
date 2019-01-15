import { Component, NgZone, OnInit } from '@angular/core';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  matcher: MediaQueryList;
  public showImprint = environment.enableImprint;

  constructor(private _ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.matcher = matchMedia(`(max-width: 1240px)`);
    this.matcher.addEventListener('any', (event: MediaQueryListEvent) => this._ngZone.run(() => event.matches));
  }

  isScreenSmall(): boolean {
    return this.matcher.matches;
  }
}
