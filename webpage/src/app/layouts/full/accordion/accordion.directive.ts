import { Directive } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
// import 'rxjs/add/operator/filter';

import { AccordionLinkDirective } from "./accordion-link.directive";

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective {

  protected navlinks: Array<AccordionLinkDirective> = [];

  constructor(
    private router: Router
  ) {
    setTimeout(() => this.checkOpenLinks());
  }

  ngAfterContentChecked(): void {
    // this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(e => this.checkOpenLinks());
  }

  closeOtherLinks(selectedLink: AccordionLinkDirective): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks() {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        if (currentUrl.indexOf(link.group) > 0) {
          link.selected = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }
}