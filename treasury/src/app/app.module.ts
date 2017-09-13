import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { CatalogService } from './services/catalog.service';
import { FormAddComponent } from './form-add/form-add.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module'
import { TableDemoComponent } from './table-demo/table-demo.component';
import { TheMovieDbService } from './themoviedb/the-movie-db.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableDemoComponent,
    FormAddComponent,
    PageNotFoundComponent,
    CatalogListComponent,
    LoginComponent
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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CatalogService,
    TheMovieDbService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
