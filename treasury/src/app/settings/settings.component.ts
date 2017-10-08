import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  languages: {}[] = [
    { value: 'de', displayValue: 'German' },
    { value: 'en', displayValue: 'English' },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  setLanguage(value: string) {
    console.log('language was set to ', value);
  }

}
