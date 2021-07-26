import { ResourceModel } from '../../resource/models/resource.model';
import {PermissionModel} from "./permisson.model";

export class User extends ResourceModel {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public is_active: boolean,
        public created_at: Date | null,
        public permissions: PermissionModel[]
    ) {
        super();
    }
}

export class UserApi extends ResourceModel{

    constructor(
        public name: string,
        public email: string,
        public is_active: boolean,
        public password?: string,
        public c_password?: string,
        public created_at?: string,
        public id?: number,
    ) {
        super();
    }
}
