import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-disable-authorization',
  templateUrl: './disable-authorization.component.html',
  styleUrls: ['./disable-authorization.component.css']
})
export class DisableAuthorizationComponent implements  OnInit {

  @Output() doClick = new EventEmitter();
  @Input() public permission: string = '';
  @Input() public type: string = ''; // link, btn-icon, btn
  @Input() public url: string = '';
  @Input() public icon: string = '';
  @Input() public color: string = '';
  @Input() public text: string = '';

  public style = {};

  constructor(
      private router: Router,
      private snackBar: MatSnackBar,
      private usersService: UsersService
  ) { }

  ngOnInit(): void {
    if (!this.usersService.checkPermission(this.permission)) {
      if (this.type === 'btn') {
        this.style = {
          'background-color': '#cccccc'
        };
      } else {
        this.style = {
          color: '#cccccc'
        };
      }
    }
  }

  onClick($event: any) {
    if (!this.usersService.checkPermission(this.permission)) {
      this.notify('Você não tem permissão para efetuar essa ação.');
    } else {
      if (this.type && this.type === 'link') {

        if (this.url) {
          if ($event.ctrlKey) {
            window.open(this.url , '_blank');
          } else {
            this.router.navigate([this.url]);
          }
        }

      } else if (this.type === 'btn' || this.type === 'btn-icon') {
        this.doClick.emit();
      }
    }
  }

  protected notify(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

}
