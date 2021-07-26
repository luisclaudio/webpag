import { ResourceModel } from '../resource/models/resource.model';

import { User } from "../user/models/user.model";
import { PermissionModel } from "../user/models/permisson.model";

export class AuthenticationModel extends ResourceModel {

    constructor(
        public user: User | null,
        public permissions: PermissionModel[] | []
    ) {
        super();
    }
}


