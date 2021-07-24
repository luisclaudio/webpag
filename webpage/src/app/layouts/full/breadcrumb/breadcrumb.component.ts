import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {

  readonly name = environment.name;
  private routeSub: Subscription | null = null;

  public pageInfo: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        const title = event['title'] ? `- ${event['title']}` : '';
        this.titleService.setTitle(`${this.name} ${title}`);
        this.pageInfo = event;
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
