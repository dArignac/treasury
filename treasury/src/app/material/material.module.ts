import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdFormFieldModule,
  MdIconModule,
  MdInputModule,
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
    MdAutocompleteModule,
    MdButtonModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdOptionModule,
    MdPaginatorModule,
    MdSlideToggleModule,
    MdTableModule,
    MdToolbarModule,
  ],
  exports: [
    MdAutocompleteModule,
    MdButtonModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
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
