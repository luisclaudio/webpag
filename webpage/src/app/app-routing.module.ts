import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from "./core/authentication/guards/authentication.guard";

import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { UnauthorizedComponent } from "./core/authorization/components/unauthorized/unauthorized.component";

const routes: Routes = [
  {
    path: '',
    // canActivate: [ AuthenticationGuard ],
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: UnauthorizedComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./core/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
