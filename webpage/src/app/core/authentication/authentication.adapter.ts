import { Injectable } from "@angular/core";
import { HttpAdapter } from "../resource/adapter/http.adapter";

import { AuthenticationModel } from "./authentication.model";
import { UserAdapter } from "../user/adapter/user.adapter";
import { PermissionAdapter } from "../user/adapter/permission.adapter";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationAdapter extends HttpAdapter<AuthenticationModel | null>  {

  constructor(
    private userAdapter: UserAdapter,
    private permissionAdapter: PermissionAdapter
  ) {
    super();
  }

  adaptFromApi(item: any): AuthenticationModel {
    return new AuthenticationModel(
      item ? this.userAdapter.adaptFromApi(item) : null,
      item.user.permissions && item.user.permissions.lenght > 0
        ? item.user.permissions.map(i: any => this.permissionAdapter.adaptFromApi(i))
        : []

    );
  }

  adaptToApi(item: any): null {
    return null;
  }
}
