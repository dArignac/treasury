import {Component} from '@angular/core';
import {MdcSnackbar, MdcSwitchChange} from '@angular-mdc/web';
import {BaseComponent} from '../base/base.component';
import {BackupService} from '../services/backup.service';
import {UserService} from '../services/user.service';
import {UserSettings} from '../services/user-settings';
import {IRegion} from '../themoviedb/iregion';


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
  tmdbRegionValue = 'EN';
  isCatalogPublic = false;
  nickname: string = null;

  constructor(private userService: UserService,
              private backupService: BackupService,
              private snackbar: MdcSnackbar) {
    super();
    this.userService.userSettings$.subscribe(
      (userSettings) => {
        if (userSettings) {
          this.setSettings(userSettings);
        }
      }
    );

    // if app was already initialized and called again, the subscription above does nothing (it just is trigger if something changes)
    // so we just grab the values from the UserService
    if (this.userService.userSettings) {
      this.setSettings(this.userService.userSettings);
    }
  }

  /**
   * Sets the given user settings into the component.
   * @param settings UserSettings the user settings object
   */
  setSettings(settings: UserSettings) {
    this.tmdbRegion = this.getLanguageHumanReadable(settings.tmdbRegion);
    this.tmdbRegionValue = settings.tmdbRegion;
    this.isCatalogPublic = settings.isCatalogPublic;
    this.nickname = settings.nickname;
  }

  /**
   * Toggles the catalog visibility.
   */
  toggleCatalogVisibility(event: MdcSwitchChange) {
    this.setUserSetting('isCatalogPublic', event.checked);
  }

  /**
   * Sets the TMDB region value of the user to the given value.
   * @param identifier language value as ISO-3166-1 code
   */
  setTMDBRegion(identifier: string) {
    this.setUserSetting('tmdbRegion', identifier);
  }

  /**
   * Sets a user setting with the provided values to the settings document of the current user.
   * @param key the settings key
   * @param value the value to set
   */
  private setUserSetting(key: string, value: string | boolean) {
    this.userService.setUserSetting(key, value).then(
      () => {
      },
      () => {
        // FIXME send to sentry
        this.snackbar.open(
          'An error occurred while updating a user value. This may happened because the underlying Firebase database service returned an invalid '
          + ' response. Please refresh the page an try again!',
          'Close',
          this.getSnackbarConfig()
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

  backupData() {
    this.backupService.createAndServeExport();
  }

  handleNicknameChanged(value: any) {
    this.setUserSetting('nickname', value.trim());
  }

}
