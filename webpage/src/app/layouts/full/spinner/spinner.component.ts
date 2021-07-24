import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {

  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

  public isSpinnerVisible = true;

  private routeSub: Subscription | null = null;

  constructor(
    private router: Router,
  ) {
    this.routeSub = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
