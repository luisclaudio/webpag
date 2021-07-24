import { Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

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
];
