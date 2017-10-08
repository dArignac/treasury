import { isUndefined } from 'util';

import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  omdbRegionChoices: {}[] = [
    { value: 'de', displayValue: 'German' },
    { value: 'en', displayValue: 'English' },
  ];
  omdbRegion: string = null;

  constructor(private userService: UserService) {
    // if the user is already initialized, we do not enter the settings page on application loading.
    if (!isUndefined(this.userService.user)) {
      this.omdbRegion = this.getLanguageHumanReadable(this.userService.user.omdbRegion);
    }
    this.userService.user$.subscribe(
      (user) => {
        if (user) {
          this.omdbRegion = this.getLanguageHumanReadable(user.omdbRegion);
        }
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Sets the OMDB region value of the user to the given value.
   * @param {string} identifier language value as ISO-3166-1 code
   */
  setOMDBRegion(identifier: string) {
    this.userService.setUserProperty('omdbRegion', identifier).then(
      () => {},
      (error) => {
        // FIXME handle error
        console.log('error upon updating omdbRegion of user happened');
        console.log(error);
      }
    );
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
