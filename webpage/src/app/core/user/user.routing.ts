import { Routes } from '@angular/router';

import { AuthorizationGuard } from '../authorization/guards/authorization.guard';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const UserRoutes: Routes = [
    {
        path: '',
        component: UserListComponent,
        // canActivate: [AuthorizationGuard],
        data: {
            title: 'Usuário',
            role: 'user.list',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Usuário' }
            ]
        }
    },
    {
        path: 'form',
        component: UserFormComponent,
        // canActivate: [AuthorizationGuard],
        data: {
            title: 'Usuário: Cadastro',
            role: 'user.create',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Usuário', url: '/user' },
                { title: 'Cadastro' }
            ]
        }
    },
    {
        path: 'form/:id',
        component: UserFormComponent,
        // canActivate: [AuthorizationGuard],
        data: {
            title: 'Usuário: Edição',
            role: 'user.update',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Usuário', url: '/user' },
                { title: 'Edição' }
            ]
        }
    }
];
