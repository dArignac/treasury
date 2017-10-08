import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  movieLanguageChoices: {}[] = [
    { value: 'de', displayValue: 'German' },
    { value: 'en', displayValue: 'English' },
  ];

  movieLanguage$: Observable<string> = null;
  movieLanguageObserver: Observer<string>;

  constructor(private userService: UserService) {
    this.movieLanguage$ = new Observable<string>((observer: Observer<string>) => {
      this.movieLanguageObserver = observer;
      this.getLanguage();
    });
  }

  ngOnInit() {
  }

  getLanguage(): string {
    // FIXME implement getting lang from Firestore
    return '';
  }

  /**
   * Sets the movie language of the user to the given value.
   * @param {string} identifier language value as ISO-3166-1 code
   */
  setLanguage(identifier: string) {
    this.userService.setLanguage(identifier).then((success) => {
      if (success) {
        // update the observer with the value
        this.movieLanguageObserver.next(identifier);
      }
    });
  }

  getLanguageHumanReadable(identifier: string) {
    switch (identifier) {
      case 'de':
        return 'German';
      case 'en':
        return 'English';
    }
    return 'unknown';
  }

}
