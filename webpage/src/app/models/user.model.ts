import { PermissionModel } from "./permisson.model";

export class UserModel {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public created_at: Date | null,
    public permissions: PermissionModel[],
    public country?: string,
    public state?: string,
    public city?: string,
    public county?: string,
    public street?: string,
    public house_number?: string
  ) { }
}

export class UserModelApi{

  constructor(
    public name: string,
    public email: string,
    public country?: string,
    public state?: string,
    public city?: string,
    public county?: string,
    public street?: string,
    public house_number?: string,
    public password?: string,
    public c_password?: string,
    public created_at?: string,
    public id?: number,
  ) { }
}
