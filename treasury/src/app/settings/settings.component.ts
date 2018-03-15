import { isUndefined } from 'util';

import { Component, ComponentFactoryResolver } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { ErrorComponent } from '../error/error.component';
import { UserService } from '../services/user.service';
import { IRegion } from '../themoviedb/iregion';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent {

  tmdbRegionChoices: IRegion[] = [
    {value: 'DE', displayValue: 'German'},
    {value: 'EN', displayValue: 'English'},
  ];
  tmdbRegion: string = null;
  isCatalogPublic = false;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super();
    // if the user is already initialized, we do not enter the settings page on application loading.
    if (!isUndefined(this.userService.user)) {
      this.tmdbRegion = this.getLanguageHumanReadable(this.userService.userSettings.tmdbRegion);
    }
    this.userService.userSettings$.subscribe(
      (userSettings) => {
        if (userSettings) {
          this.tmdbRegion = this.getLanguageHumanReadable(userSettings.tmdbRegion);
          this.isCatalogPublic = userSettings.isCatalogPublic;
        }
      }
    );
  }

  /**
   * Toggles the catalog visibility.
   */
  toggleCatalogVisibility() {
   this.setUserSetting('isCatalogPublic', !this.isCatalogPublic);
  }

  /**
   * Sets the TMDB region value of the user to the given value.
   * @param {string} identifier language value as ISO-3166-1 code
   */
  setTMDBRegion(identifier: string) {
   this.setUserSetting('tmdbRegion', identifier);
  }

  /**
   * Sets a user setting with the provided values to the settings document of the current user.
   * @param {string} key the settings key
   * @param {string|boolean} value the value to set
   */
  private setUserSetting(key: string, value: string|boolean) {
    this.userService.setUserSetting(key, value).then(
      () => {},
      (error) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);
        this.displayErrorModal(
          componentFactory,
          'Error upon setting user value',
          'An error occurred while updating a user value. This may happened because the underlying Firebase database service returned an invalid response.',
          'Please refresh the page an try again!',
          error
        );
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
