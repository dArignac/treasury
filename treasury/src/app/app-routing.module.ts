import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth-guard.service';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FormAddComponent } from './form-add/form-add.component';

const appRoutes: Routes = [
  {
    path: 'catalog',
    component: CatalogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: FormAddComponent,
    canActivate: [AuthGuard]
  },
  {
    'path': 'login',
    component: LoginComponent
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
export class AppRoutingModule {}
