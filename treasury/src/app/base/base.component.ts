import { Component, ComponentFactory, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {

  @ViewChild('errorModal', {read: ViewContainerRef}) errorModal: ViewContainerRef;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Triggers the display of an error modal with the given data.
   * This is generalized in this base component to not repeat code that much.
   * @param {ComponentFactory<{}>} componentFactory
   * @param {string} title the error title
   * @param {string} message the concrete error message
   * @param {string} outro an outro text
   * @param {string} error the technical error message
   */
  displayErrorModal(componentFactory: ComponentFactory<{}>, title: string, message: string, outro: string, error: string) {
    this.errorModal.clear();
    const errorComponent = <ErrorComponent>this.errorModal.createComponent(componentFactory).instance;
    errorComponent.data = {
      'title': title,
      'message': message,
      'error': 'The original error message was: ' + error,
      'outro': outro,
      'button': 'Close the dialog'
    };
  }

}
