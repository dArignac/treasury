import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { MaterialDesignModule } from './materialdesign/materialdesign.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
