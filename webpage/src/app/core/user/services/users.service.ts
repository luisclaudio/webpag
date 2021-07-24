import { Injectable, Injector } from '@angular/core';

import { ResourceService } from '../../resource/services/resource.service';

import { User } from '../models/user.model';
import { UserAdapter } from "../adapter/user.adapter";

@Injectable({
    providedIn: 'root'
})
export class UsersService extends ResourceService<User> {

    constructor(
      protected injector: Injector,
      protected adapter: UserAdapter
    ) {
        super('users', injector, adapter);
    }

    get resourceName(): string {
        return 'Users';
    }
}
