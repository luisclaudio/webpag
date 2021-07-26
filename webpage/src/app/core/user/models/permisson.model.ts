import { ResourceModel } from '../../resource/models/resource.model';

export class PermissionModel extends ResourceModel {

    constructor(
        public id: number,
        public user_id: number,
        public name: string
    ) {
        super();
    }
}

export class PermissionApiModel extends ResourceModel{

    constructor(
        public name: string,
        public user_id: number,
        public id?: number,
    ) {
        super();
    }
}
