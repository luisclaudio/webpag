import { Injectable } from "@angular/core";
import { HttpAdapter } from "../resource/adapter/http.adapter";
import { AuthenticationModel } from "./authentication.model";
import { UserAdapter } from "../user/adapter/user.adapter";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationAdapter extends HttpAdapter<AuthenticationModel | null>  {

  constructor(
    private userAdapter: UserAdapter
  ) {
    super();
  }

  adaptFromApi(item: any): AuthenticationModel {
    return new AuthenticationModel(
      item.user ? this.userAdapter.adaptFromApi(item.user) : null,
      item.profile,
      item.token,

    );
  }

  adaptToApi(item: any): null {
    return null;
  }
}
