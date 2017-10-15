import { Component, OnInit } from '@angular/core';

import * as fs from 'file-saver';
import * as _ from 'lodash';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  /**
   * Creates the backup and serves it as file download.
   */
  createAndServeExport() {
    this.getExportData().then(
      (ex) => this.serveDownload(ex, 'movies')
    );
  }

  /**
   * Fetches the data to be exported from UserService.
   * Currently only tied to movies.
   * @returns {Promise<Object>}
   */
  private getExportData(): Promise<object> {
    return new Promise((resolve, reject) => {
      let ex = {
        'movies': []
      };
      let moviesCollectionSubscription = this.userService.getMovieCollection().valueChanges().subscribe(
        (movies) => {
          ex['movies'] = _.map(movies, function (movie) {
            return movie.id;
          });
          moviesCollectionSubscription.unsubscribe();
          resolve(ex);
        }
      );
    });
  }

  /**
   * Create a browser file download from the given object.
   * It will be served as json file.
   * @param {Object} data
   * @param {string} filename
   */
  private serveDownload(data: object, filename: string) {
    fs.saveAs(
      new Blob(
        [JSON.stringify(data)],
        {type: 'application/json'}
      ),
      filename + '.json'
    );
  }

}
