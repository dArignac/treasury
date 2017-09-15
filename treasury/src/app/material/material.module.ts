import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdFormFieldModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdOptionModule,
  MdPaginatorModule,
  MdSlideToggleModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdOptionModule,
    MdPaginatorModule,
    MdSlideToggleModule,
    MdTableModule,
    MdToolbarModule,
  ],
  exports: [
    MdButtonModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdOptionModule,
    MdPaginatorModule,
    MdSlideToggleModule,
    MdTableModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialModule {
}
