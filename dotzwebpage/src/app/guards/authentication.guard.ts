import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsersService } from "../services/users.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.usersService.isAuthenticated()
            .pipe(
                tap((b) => {
                    if (!b) {
                        this.router.navigate(['/login']);
                    }
                })
            );
    }
}
