import { ResourceModel } from '../resource/models/resource.model';

import { User } from "../user/models/user.model";

export class AuthenticationModel extends ResourceModel {

    constructor(
        public user: User | null,
        public permissions: string[] | null,
        public token: string
    ) {
        super();
    }
}


