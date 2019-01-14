import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {

  constructor() {
  }

  getSnackbarConfig(): object {
    return {
      actionOnBottom: true,
      align: 'start',
      dismissOnAction: true,
      multiline: true,
      stacked: true,
      timeout: 10000,
    };
  }

  ngOnInit() {
  }

}
