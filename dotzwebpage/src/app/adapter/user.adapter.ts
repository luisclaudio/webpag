import { Injectable } from "@angular/core";

import * as moment from 'moment';

import { HttpAdapter } from "./http.adapter";
import { UserModel, UserModelApi } from "../models/user.model";
import { PermissionModel } from "../models/permisson.model";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends HttpAdapter<UserModel | UserModelApi>  {

  adaptFromApi(item: any): UserModel {
    const formattedCreatedAt = moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').isValid() ? moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').toDate() : null;

    const permissions: PermissionModel[] = [];

    if (item.permissions && item.permissions.length > 0) {
      item.permissions.map((permission: PermissionModel) => permissions.push(
        new PermissionModel(
          permission.id,
          permission.user_id,
          permission.name
        )
      ));
    }

    return new UserModel(
      item.id,
      item.name,
      item.email,
      item.is_active,
      formattedCreatedAt,
      permissions
    );
  }

  adaptToApi(item: any): UserModelApi {
    return new UserModelApi(
      item.name,
      item.email,
      item.is_active,
      item.password,
      item.c_password,
      moment().format('YYYY-MM-DD'),
      item.id,
    );
  }
}
