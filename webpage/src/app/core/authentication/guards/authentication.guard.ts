import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isAuthenticated()
            .pipe(
                tap((b) => {
                    if (!b) {
                        this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
                    }
                })
            );
    }
}
