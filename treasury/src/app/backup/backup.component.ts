import { Component, OnInit } from '@angular/core';

import * as fs from 'file-saver';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Triggers the download of the backup file.
   */
  download() {
    let b = new Blob(
      ['{"a": 1, "b": "xxx"}'],
      {type: 'application/json'}
    );
    fs.saveAs(b, 'movies.json');
  }

}
