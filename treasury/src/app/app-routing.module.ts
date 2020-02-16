import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ErrorPageDefaultComponent } from './error-page-default/error-page-default.component';
import { FormAddComponent } from './form-add/form-add.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RatingsComponent } from './ratings/ratings.component';
import { AuthGuard } from './services/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { TheMovieDbTokenReturnComponent } from './the-movie-db/authentication';

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
    path: 'ratings',
    component: RatingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imprint',
    component: ImprintComponent
  },
  {
    path: 'tmdb-token',
    component: TheMovieDbTokenReturnComponent,
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
      { enableTracing: environment.debugRouting }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
