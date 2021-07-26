import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsersService } from "../services/users.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (route.data.role) {
            const isAuthorized = this.usersService.checkPermission(route.data.role);
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
