import { Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";

export const AuthenticationRoutes: Routes = [
    {
      path: '404',
      component: ErrorComponent
    },
    {
      path: 'login',
      component: LoginComponent,
      data: {
        title: 'Login'
      }
    },
    {
      path: 'register',
      component: RegisterComponent,
      data: {
        title: 'Register'
      }
    },
];
