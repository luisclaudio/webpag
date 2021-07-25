import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

import { MenuModel } from "./menu.model";
import { MenuAdapter } from "./menu.adapter";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private subjMenu$: BehaviorSubject<MenuModel[] | []> = new BehaviorSubject<MenuModel[] | []>([]);

  private menu = [
    {
      state: 'home',
      name: 'Home',
      type: 'link',
      icon: 'home',
      permission: 'home'
    },
    {
      state: 'address',
      name: 'Address ship',
      type: 'link',
      icon: 'room',
      permission: 'address.list'
    },
    {
      state: 'products',
      name: 'Products',
      type: 'link',
      icon: 'list',
      permission: 'products.lis'
    },
    {
      state: 'orders',
      name: 'Orders',
      type: 'link',
      icon: 'star',
      permission: 'products.lis'
    }
  ]

  constructor(
    private menuAdapter: MenuAdapter
  ) {}

  fetch(): Observable<MenuModel[] | []> {
    const menuAdapter = this.menu.map(menu => this.menuAdapter.adaptFromApi(menu));
    this.subjMenu$.next(menuAdapter);
    return this.subjMenu$.asObservable();
  }
}
