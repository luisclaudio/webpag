import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public currentUser$: Observable<UserModel | null> = new Observable<UserModel | null>();

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {
    this.currentUser$ = this.usersService.getUser();
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/login']);
  }

}
