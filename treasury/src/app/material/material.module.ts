import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule,
  ],
  exports: [
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialModule {
}
