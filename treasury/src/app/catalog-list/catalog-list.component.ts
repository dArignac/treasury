import { Component, OnInit } from '@angular/core';

import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit() {
  }

}
