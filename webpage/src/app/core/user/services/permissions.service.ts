import {Injectable, Injector} from '@angular/core';
import {ResourceService} from "../../resource/services/resource.service";

import {PermissionModel} from "../models/permisson.model";
import {PermissionAdapter} from "../adapter/permission.adapter";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends ResourceService<PermissionModel> {

  constructor(
    protected injector: Injector,
    protected adapter: PermissionAdapter
  ) {
    super('permissions', injector, adapter);
  }

  get resourceName(): string {
    return 'Permissions';
  }
}
