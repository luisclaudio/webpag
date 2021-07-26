export class PermissionModel {

    constructor(
        public id: number,
        public user_id: number,
        public name: string
    ) { }
}

export class PermissionApiModel {

    constructor(
        public name: string,
        public user_id: number,
        public id?: number,
    ) { }
}
