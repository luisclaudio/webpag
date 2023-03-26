import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, forkJoin, Observable, of } from "rxjs";
import { map, mergeAll } from 'rxjs/operators';

import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";

import { UserModel } from "../models/user.model";
import { UserAdapter } from "../adapter/user.adapter";
import { PermissionModel } from "../models/permisson.model";
import { PermissionAdapter } from "../adapter/permission.adapter";

import { APIResponse } from "../models/APIResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public readonly initialBalance: number = 500;

  private readonly url = environment.baseApi;
  private path: string = 'users';

  private meta$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private userCookieAddress: string =  'av-ng-security-user';
  private userPermissionCookieAddress: string =  'av-ng-security-permissions';
  private pathCookie: string =  '/';

  private subjUser$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  private subjAuthorization$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private userAdapter: UserAdapter,
    private permissionAdapter: PermissionAdapter,
  ) { }

  public getPagination(): Observable<number> {
    return this.meta$.asObservable();
  }

  public fetch(param: any): Observable<UserModel[]> {
    let params = new HttpParams();

    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            params = params.append(key, `${param[key]}`);
        }
    }

    return this.http.get<APIResponse<UserModel[]>>(`${this.url}/${this.path}`, { params: params })
        .pipe(
            map((response) => {
                if (response && response.total) {
                  this.meta$.next(response.total);
                }
                if (response && response.data && response.data.length > 0) {
                  return response.data.map(item => this.userAdapter.adaptFromApi(item));
                }
                return [];
            })
        );
  }

  public get(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/${this.path}/${id}`)
      .pipe(
          map(response => {
              return this.userAdapter.adaptFromApi(response);
          })
      );
  }

  public store(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/${this.path}`, this.userAdapter.adaptToApi(data)).pipe(
      map(response => {
        return this.userAdapter.adaptFromApi(response);
      })
    );
  }

  public update(data: any): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.url}/${this.path}/${data.id}`, this.userAdapter.adaptToApi(data)).pipe(
        map(response => {
            return this.userAdapter.adaptFromApi(response);
        })
    );
  }

  public permissionStore(user_id: number, data: any): Observable<PermissionModel> {
    return this.http.post<PermissionModel>(`${this.url}/users/${user_id}/permissions`, this.permissionAdapter.adaptToApi(data)).pipe(
      map(response => {
        return this.permissionAdapter.adaptFromApi(response);
      })
    );
  }

  public userStore(data: any): Observable<UserModel | number | PermissionModel[]> {

    const userSaved$ = this.store(data);

    const permissionsUserSaved$ = userSaved$.pipe(
      map(response => {

        const sources = [];
        sources.push(this.permissionStore(+response.id, {
          name: 'home',
          user_id: +response.id,
        }));
        sources.push(this.permissionStore(+response.id, {
          name: 'address',
          user_id: +response.id,
        }));
        sources.push(this.permissionStore(+response.id, {
          name: 'product',
          user_id: +response.id,
        }));
        sources.push(this.permissionStore(+response.id, {
          name: 'order',
          user_id: +response.id,
        }));

        return sources.length > 0 ? forkJoin(sources) : of(0);
      })
    );

    return permissionsUserSaved$.pipe(mergeAll());
  }

  public login(credentials: { username: string, password: string}): Observable<number | UserModel> {
    return this.http.get<APIResponse<UserModel[]>>(`${this.url}/users`, { params: credentials })
      .pipe(
        map((response) => {
          if (response && response.data && response.data.length > 0) {

            const userAdapted = this.userAdapter.adaptFromApi(response.data[0]);

            let userWithoutPermissions = Object.assign({}, {
              id: userAdapted.id,
              name: userAdapted.name,
              email: userAdapted.email,
              created_at: userAdapted.created_at
            });

            const userPermissions: string[] = userAdapted.permissions.map((permName: PermissionModel) => permName.name);

            this.cookieService.set(this.userCookieAddress, JSON.stringify(userWithoutPermissions), 0, this.pathCookie);
            this.cookieService.set(this.userPermissionCookieAddress, JSON.stringify(userPermissions), 0, this.pathCookie);

            this.subjUser$.next(userAdapted);
            this.subjAuthorization$.next(userPermissions);
            this.subjLoggedIn$.next(true);

            return new UserModel(
              userAdapted.id,
              userAdapted.name,
              userAdapted.email,
              userAdapted.created_at,
              userAdapted.permissions
            );
          }
          return new UserModel(0, '', '', new Date(), []);
        })
      );
  }

  public logout() {
    this.cookieService.delete(this.userPermissionCookieAddress, this.path);
    this.cookieService.delete(this.userCookieAddress, this.path);

    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.cookieService.check(this.userCookieAddress)) {
      return of(this.cookieService.check(this.userCookieAddress));
    }

    return this.subjLoggedIn$.asObservable();
  }

  public checkPermission(permission: string): boolean {
    let permissionsObject: string[] = [];

    if (this.cookieService.check(this.userPermissionCookieAddress)) {
      permissionsObject = JSON.parse(this.cookieService.get(this.userPermissionCookieAddress));
    }

    return permissionsObject.includes(permission);
  }

  getUser(): Observable<UserModel | null> {
    if (this.cookieService.check(this.userCookieAddress)) {

        const userCookie = JSON.parse(this.cookieService.get(this.userCookieAddress));

        this.subjUser$.next(userCookie);

        return this.subjUser$.asObservable();
    }
    return of();
}
}
