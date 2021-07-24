import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterModule } from '@angular/router';

import { AuthenticationRoutes } from './authentication.routing';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        ErrorComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule { }
