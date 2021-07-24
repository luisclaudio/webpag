import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MaterialModule } from '../material-module';

import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HideAuthorizationDirective } from './directives/hide-authorization.directive';
import { DisableAuthorizationComponent } from './components/disable-authorization/disable-authorization.component';

@NgModule({
    declarations: [
        UnauthorizedComponent,
        HideAuthorizationDirective,
        DisableAuthorizationComponent
    ],
    exports: [
        HideAuthorizationDirective,
        DisableAuthorizationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MatButtonModule
    ]
})
export class AuthorizationModule { }
