import { PermissionModel } from "./permisson.model";

export class UserModel {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public is_active: boolean,
    public created_at: Date | null,
    public permissions: PermissionModel[]
  ) { }
}

export class UserModelApi{

  constructor(
    public name: string,
    public email: string,
    public is_active: boolean,
    public password?: string,
    public c_password?: string,
    public created_at?: string,
    public id?: number,
  ) { }
}
