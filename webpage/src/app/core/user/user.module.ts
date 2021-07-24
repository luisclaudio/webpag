import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutes } from './user.routing';

import { MaterialModule } from '../material-module';
import { SharedModule } from '../../shared/shared.module';
import { ResourceModule } from '../resource/resource.module';
import { AuthorizationModule } from '../authorization/authorization.module';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ConfirmPasswordValidatorDirective } from './validators/confirm-password-validator.directive';

@NgModule({
    declarations: [
        UserListComponent,
        UserFormComponent,
        ConfirmPasswordValidatorDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ResourceModule,
        AuthorizationModule
    ]
})
export class UserModule { }
