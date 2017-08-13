import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdMenuModule
  ],
  exports: [
    MdMenuModule
  ],
  declarations: []
})
export class MaterialDesignModule { }
