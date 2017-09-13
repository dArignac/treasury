import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module'
import { AuthService } from './services/auth.service';
import { CatalogService } from './services/catalog.service';
import { UserService } from './services/user.service';
import { CatalogComponent } from './catalog/catalog.component';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { FormAddComponent } from './form-add/form-add.component';
import { TheMovieDbService } from './themoviedb/the-movie-db.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    TableDemoComponent,
    FormAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CatalogService,
    TheMovieDbService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
