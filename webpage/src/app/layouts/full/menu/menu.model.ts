import { MenuChildrenItemModel } from "./menu-children-item.model";
import { MenuBadgeItemModel } from "./menu-badge-item.model";
import { MenuSeparatorModel } from "./menu-separator.model";

export class MenuModel {

  constructor(
    public state: string,
    public name: string,
    public type: string,
    public icon: string,
    public permission?: string,
    public badge?: MenuBadgeItemModel[],
    public separator?: MenuSeparatorModel[],
    public children?: MenuChildrenItemModel[]
  ) { }
}
