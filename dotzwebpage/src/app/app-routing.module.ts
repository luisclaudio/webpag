import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthorizationGuard } from "./guards/authorization.guard";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { BlankPageComponent } from "./layouts/blank-page/blank-page.component";
import { FullPageComponent } from "./layouts/full-page/full-page.component";
import { UnauthorizedComponent } from "./layouts/unauthorized/unauthorized.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthenticationGuard ],
    component: FullPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [ AuthorizationGuard ],
        data: {
          role: 'home',
        }
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      }
    ]
  },
  {
    path: '',
    component: BlankPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
