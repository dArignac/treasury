import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdMenuModule} from '@angular/material';

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
