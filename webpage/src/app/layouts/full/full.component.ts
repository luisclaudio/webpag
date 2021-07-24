import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MediaMatcher } from "@angular/cdk/layout";

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnDestroy {

  readonly name = environment.name;
  readonly nameSystem = environment.nameSystem;
  readonly color = environment.color;

  public dir: string = 'ltr';
  public miniSidebar: boolean = false;
  public boxed: boolean = false;
  public sidebarOpened: boolean = false;
  public status: boolean = false;

  public green: boolean = false;
  public blue: boolean = false;
  public dark: boolean = false;
  public danger: boolean = false;

  public mobileQuery: MediaQueryList;
  readonly _mobileQueryListener: () => void;
  public config: PerfectScrollbarConfigInterface = {};

  public search: boolean = false;
  public searchField: FormControl = new FormControl();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.miniSidebar = true;

    if (this.color === 'red') {
      this.danger = true;
    } else if (this.color === 'green') {
      this.green = true;
    }
  }

  public clickEvent(): void {
    this.status = !this.status;
  }

  public onSearch() {
    alert('Research finished!')
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
