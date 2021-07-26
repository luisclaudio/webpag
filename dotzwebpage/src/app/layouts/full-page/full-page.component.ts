import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-full-page',
  templateUrl: './full-page.component.html',
  styleUrls: ['./full-page.component.scss']
})
export class FullPageComponent {

  readonly name = environment.name;

  public status: boolean = false;

  public blue: boolean = false;

  public mobileQuery: MediaQueryList;
  readonly _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public clickEvent(): void {
    this.status = !this.status;
  }

}
