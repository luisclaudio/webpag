import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { User } from "../../../core/user/models/user.model";
import { AuthenticationService } from "../../../core/authentication/services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public config: PerfectScrollbarConfigInterface = {};

  public currentUser$: Observable<User | null> = new Observable<User | null>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser$ = this.authenticationService.getUser();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }

}
