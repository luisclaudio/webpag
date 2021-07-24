import { Injectable } from "@angular/core";
import * as moment from 'moment';

import { HttpAdapter } from "../../resource/adapter/http.adapter";

import { User, UserApi } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends HttpAdapter<User | UserApi>  {

  adaptFromApi(item: any): User {
    const formattedCreatedAt = moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').isValid() ? moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').toDate() : null;

    return new User(
      item.id,
      item.name,
      item.email,
      item.is_active,
      formattedCreatedAt
    );
  }

  adaptToApi(item: any): UserApi {
    return new UserApi(
      item.name,
      item.email,
      item.is_active,
      item.password,
      item.c_password,
      item.id,
    );
  }
}
