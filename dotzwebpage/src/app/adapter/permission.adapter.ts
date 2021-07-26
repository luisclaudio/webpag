import { Injectable } from "@angular/core";

import { HttpAdapter } from "./http.adapter";
import { PermissionApiModel, PermissionModel } from "../models/permisson.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionAdapter extends HttpAdapter<PermissionModel | PermissionApiModel>  {

  adaptFromApi(item: any): PermissionModel {
    return new PermissionModel(
      item.id,
      item.user_id,
      item.name
    );
  }

  adaptToApi(item: any): PermissionApiModel {
    return new PermissionApiModel (
      item.name,
      item.user_id,
      item.id,
    );
  }
}
