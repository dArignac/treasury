import 'hammerjs';
import * as Raven from 'raven-js';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BackupComponent } from './backup/backup.component';
import { BaseComponent } from './base/base.component';
import { ErrorComponent } from './error/error.component';
import { ErrorPageDefaultComponent } from './error-page-default/error-page-default.component';
import { FooterComponent } from './footer/footer.component';
import { FormAddComponent } from './form-add/form-add.component';
import { HeaderComponent } from './header/header.component';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { TheMovieDbService } from './themoviedb/the-movie-db.service';
import { UserService } from './services/user.service';


if (environment.sentryDSN.length > 0) {
  Raven.config(environment.sentryDSN).install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormAddComponent,
    MovieListComponent,
    PageNotFoundComponent,
    HomeComponent,
    SettingsComponent,
    BackupComponent,
    ErrorComponent,
    BaseComponent,
    ErrorPageDefaultComponent,
    FooterComponent,
    ImprintComponent
  ],
  entryComponents: [ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TheMovieDbService,
    UserService,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
