import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth-guard.service';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormAddComponent } from './form-add/form-add.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'catalog',
    component: CatalogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-movie',
    component: FormAddComponent,
    canActivate: [AuthGuard]
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
