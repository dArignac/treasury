import {Injectable} from '@angular/core';
import * as fs from 'file-saver';
import * as _ from 'lodash';
import {share} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Injectable()
export class BackupService {

  constructor(private userService: UserService) {
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
   * @returns promise with data export
   */
  private getExportData(): Promise<object> {
    return new Promise((resolve, reject) => {
      const ex = {
        movies: []
      };
      const moviesCollectionSubscription = this.userService.getMovieCollection().valueChanges().pipe(share()).subscribe(
        (movies) => {
          ex.movies = _.map(movies, (movie) => movie.id);
          moviesCollectionSubscription.unsubscribe();
          resolve(ex);
        }
      );
    });
  }

  /**
   * Create a browser file download from the given object.
   * It will be served as json file.
   * @param data the file content
   * @param filename the file name
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
