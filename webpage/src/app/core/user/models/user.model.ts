import { ResourceModel } from '../../resource/models/resource.model';

export class User extends ResourceModel {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public is_active: boolean,
        public created_at: Date | null
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
        public id?: number,
    ) {
        super();
    }
}
