import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdToolbarModule,
  ],
  exports: [
    MdIconModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialModule {
}
