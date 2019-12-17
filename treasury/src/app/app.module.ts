import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Raven from 'raven-js';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { ErrorPageDefaultComponent } from './error-page-default/error-page-default.component';
import { FooterComponent } from './footer/footer.component';
import { FormAddComponent } from './form-add/form-add.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BackupService } from './services/backup.service';
import { UserService } from './services/user.service';
import { SettingsComponent } from './settings/settings.component';
import { TheMovieDbService } from './themoviedb/the-movie-db.service';

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
    FormAddComponent,
    MovieListComponent,
    PageNotFoundComponent,
    HomeComponent,
    SettingsComponent,
    BaseComponent,
    ErrorPageDefaultComponent,
    FooterComponent,
    ImprintComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TheMovieDbService,
    UserService,
    BackupService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
