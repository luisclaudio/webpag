import { MenuSubChildrenModel } from "./menu-sub-children.model";

export class MenuChildrenItemModel {

  constructor(
    public state: string,
    public name: string,
    public type: string,
    public permission?: string,
    public child?: MenuSubChildrenModel[],
  ) {
  }
}
