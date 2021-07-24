import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { environment } from "../../../../environments/environment";

import { ResponseModel } from '../../resource/models/response.model';
import { User } from '../../user/models/user.model';
import { AuthenticationModel } from '../authentication.model';
import { AuthenticationAdapter } from "../authentication.adapter";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    readonly url = environment.baseApi;

    private authorization: string = 'techx-gsci-ng-security-authorization';
    private permissions: string =  'techx-gsci-ng-security-permissions';
    private user: string =  'techx-gsci-ng-security-user';
    private path: string =  '/';

    private subjUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private subjAuthorization$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private authenticationAdapter: AuthenticationAdapter
    ) {}

    login(credentials: { email: string, password: string }): Observable<AuthenticationModel> {
        return this.http.post<ResponseModel<AuthenticationModel>>(`${this.url}/login`, credentials)
            .pipe(
                map((response) => {
                  if (response && response.data ) {
                    const authenticationModel = this.authenticationAdapter.adaptFromApi(response.data);

                    this.cookieService.set(this.authorization, authenticationModel.token, 0, this.path);
                    this.cookieService.set(this.user, JSON.stringify(authenticationModel.user), 0, this.path);
                    this.cookieService.set(this.permissions, JSON.stringify(authenticationModel.permissions), 0, this.path);

                    this.subjLoggedIn$.next(true);

                    this.subjUser$.next(authenticationModel.user);

                    return authenticationModel;
                  } else {

                    this.subjLoggedIn$.next(false);
                    this.subjUser$.next(null);

                    return new AuthenticationModel(null, null, '');
                  }
                })
            );
    }

    isAuthenticated(): Observable<boolean> {
        if (this.cookieService.check(this.authorization)) {
            return this.checkTokenValidation();
        }

        return this.subjLoggedIn$.asObservable();
    }

    checkTokenValidation(): Observable<boolean> {
        return of(this.cookieService.check(this.authorization));
    }

    checkToken(): boolean {
        return this.cookieService.check(this.authorization);
    }

    getToken(): string {
        if (this.cookieService.check(this.authorization)) {
            return this.cookieService.get(this.authorization);
        }
        return '';
    }

    getUser(): Observable<User | null> {
        if (this.cookieService.check(this.user)) {

            const userCookie = JSON.parse(this.cookieService.get(this.user));

            this.subjUser$.next(userCookie);

            return this.subjUser$.asObservable();
        }
        return of();
    }

    getAuthorizations(): Observable<string[]> {
      if (this.cookieService.check(this.permissions)) {
        const permissionCookie = JSON.parse(this.cookieService.get(this.permissions));

        this.subjAuthorization$.next(permissionCookie.permissions);

        return this.subjAuthorization$.asObservable();
      }
      return of();
    }

    logout() {
        this.cookieService.delete(this.authorization, this.path);
        this.cookieService.delete(this.permissions, this.path);
        this.cookieService.delete(this.user, this.path);

        this.subjLoggedIn$.next(false);
        this.subjUser$.next(null);
    }
}
