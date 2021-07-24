import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MenuModel } from "../menu/menu.model";
import { MenuAdapter } from "../menu/menu.adapter";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;
  public status: boolean = true;

  public itemSelect: number[] = []

  public menu: MenuModel[] = []

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private menuAdapter: MenuAdapter
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.menu = [
      menuAdapter.adaptFromApi({
        state: 'library',
        name: 'Biblioteca',
        type: 'link',
        icon: 'account_tree',
        permission: 'protocol.step.list',
        action: 'Solicitante',
        title: 'Biblioteca de Arquivos'
      }),
    ];
  }

  scrollToTop(){
    document!.querySelector('.page-wrapper')!.scroll({
      top: 0,
      left: 0
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
