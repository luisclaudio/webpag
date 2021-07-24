import { Injectable } from "@angular/core";
import { HttpAdapter } from "../../../core/resource/adapter/http.adapter";

import { MenuModel } from "./menu.model";
import { MenuBadgeItemModel } from "./menu-badge-item.model";
import { MenuSeparatorModel } from "./menu-separator.model";
import { MenuChildrenItemModel } from "./menu-children-item.model";
import { MenuSubChildrenModel } from "./menu-sub-children.model";

@Injectable({
  providedIn: 'root'
})
export class MenuAdapter extends HttpAdapter<MenuModel | null>  {

  adaptFromApi(item: any): MenuModel {

    const badges: MenuBadgeItemModel[] = [];
    if (item.badge && item.badge.length > 0) {
      item.badge.forEach((badge: MenuBadgeItemModel) => {
        badges.push(
          new MenuBadgeItemModel(
            badge.type,
            badge.value,
            badge.permission,
          )
        );
      });
    }

    const separators: MenuSeparatorModel[] = [];
    if (item.separator && item.separator.length > 0) {
      item.separator.forEach((separator: MenuSeparatorModel) => {
        separators.push(
          new MenuSeparatorModel(
            separator.type,
            separator.type,
            separator.permission,
          )
        );
      });
    }

    const menuChildren: MenuChildrenItemModel[] = [];
    if (item.children && item.children.length > 0) {
      item.children.forEach((childItem: MenuChildrenItemModel) => {

        const MenuChildItemChild: MenuSubChildrenModel[] = [];
        if (childItem.child && childItem.child.length > 0) {
          childItem.child.forEach((child: MenuChildrenItemModel) => {
            MenuChildItemChild.push(
              new MenuSubChildrenModel(
                item.children.state,
                item.children.name,
                item.children.type,
                item.children.permission
              )
            );
          });
        }

        menuChildren.push(
          new MenuChildrenItemModel(
            childItem.state,
            childItem.name,
            childItem.type,
            childItem.permission,
            childItem.action,
            childItem.title,
            MenuChildItemChild
          )
        );
      });
    }

    return new MenuModel(
      item.state,
      item.name,
      item.type,
      item.icon,
      item.permission,
      item.action,
      item.title,
      badges,
      separators,
      menuChildren,
    );
  }

  adaptToApi(item: any): null {
    return null;
  }
}
