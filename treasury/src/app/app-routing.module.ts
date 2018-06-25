import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth-guard.service';
import { ErrorPageDefaultComponent } from './error-page-default/error-page-default.component';
import { FormAddComponent } from './form-add/form-add.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-movie',
    component: FormAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'data-privacy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'error',
    component: ErrorPageDefaultComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: environment.debugRouting}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
