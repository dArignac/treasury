import { isUndefined } from 'util';

import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  tmdbRegionChoices: {}[] = [
    { value: 'DE', displayValue: 'German' },
    { value: 'EN', displayValue: 'English' },
  ];
  tmdbRegion: string = null;

  constructor(private userService: UserService) {
    // if the user is already initialized, we do not enter the settings page on application loading.
    if (!isUndefined(this.userService.user)) {
      this.tmdbRegion = this.getLanguageHumanReadable(this.userService.user.tmdbRegion);
    }
    this.userService.user$.subscribe(
      (user) => {
        if (user) {
          this.tmdbRegion = this.getLanguageHumanReadable(user.tmdbRegion);
        }
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Sets the TMDB region value of the user to the given value.
   * @param {string} identifier language value as ISO-3166-1 code
   */
  setTMDBRegion(identifier: string) {
    this.userService.setUserProperty('tmdbRegion', identifier).then(
      () => {},
      (error) => {
        // FIXME handle error
        console.log('error upon updating tmdbRegion of user happened');
        console.log(error);
      }
    );
  }

  getLanguageHumanReadable(identifier: string) {
    switch (identifier) {
      case 'DE':
        return 'German';
      case 'EN':
        return 'English';
    }
    return 'unknown';
  }

}
