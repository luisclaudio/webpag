import { Injectable, Injector } from '@angular/core';
import { forkJoin, Observable, of } from "rxjs";
import { map, mergeAll } from 'rxjs/operators';

import { ResourceService } from '../../resource/services/resource.service';

import { User } from '../models/user.model';
import { UserAdapter } from "../adapter/user.adapter";
import { PermissionModel } from "../models/permisson.model";
import { PermissionsService } from "./permissions.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService extends ResourceService<User> {

    constructor(
      protected injector: Injector,
      protected adapter: UserAdapter,
      protected permissionsService: PermissionsService
    ) {
        super('users', injector, adapter);
    }

    get resourceName(): string {
        return 'Users';
    }

    public userStore(data: any): Observable<User | number | PermissionModel[]> {

      const userSaved$ = this.store(data);

      const permissionsUserSaved$ = userSaved$.pipe(
        map(response => {

          this.permissionsService.setNewPath('users/' + response.id + '/permissions');

          const sources = [];
          sources.push(this.permissionsService.store({
            name: 'home',
            user_id: +response.id,
          }));
          sources.push(this.permissionsService.store({
            name: 'address',
            user_id: +response.id,
          }));
          sources.push(this.permissionsService.store({
            name: 'product',
            user_id: +response.id,
          }));
          sources.push(this.permissionsService.store({
            name: 'order',
            user_id: +response.id,
          }));

          return sources.length > 0 ? forkJoin(sources) : of(0);
        })
      );

      return permissionsUserSaved$.pipe(mergeAll());
    }


}
