import { Injectable } from '@angular/core';

import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    
    constructor(private authenticationService: AuthenticationService) { }

    checkPermission(permission: string): boolean {
        let permissionsObject: string[] = [];

        this.authenticationService.getAuthorizations().subscribe(
            permissions => permissionsObject = permissions,
            error => permissionsObject = error
        )

        return permissionsObject.includes(permission);
    }
}
