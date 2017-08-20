import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule, MdMenuModule, MdPaginatorModule, MdTableModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdPaginatorModule,
    MdTableModule,
    MdToolbarModule,
  ],
  exports: [
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdPaginatorModule,
    MdTableModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialModule {
}
