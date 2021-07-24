import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationService } from '../servises/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authorization: AuthorizationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (route.data.role) {
            const isAuthorized = this.authorization.checkPermission(route.data.role);
            return of(isAuthorized).pipe(
                tap(() => {
                    if (!isAuthorized) {
                        this.router.navigate(['/unauthorized'])
                    }
                })
            );
        } else {
            return true;
        }
    }
}
