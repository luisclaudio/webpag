import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { MediaMatcher } from '@angular/cdk/layout';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MenuModel } from "../menu/menu.model";
import { MenuService } from "../menu/menu.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;
  public status: boolean = true;

  public itemSelect: number[] = [];

  public menu: MenuModel[] = [];
  private menuSub: Subscription | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private menuService: MenuService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.menuSub = this.menuService.fetch().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.menu = response;
        }
      }
    )
  }

  scrollToTop(){
    document!.querySelector('.page-wrapper')!.scroll({
      top: 0,
      left: 0
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.menuSub) {
      this.menuSub.unsubscribe();
    }
  }
}
