import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthorizationService } from '../../servises/authorization.service';

@Component({
  selector: 'app-disable-authorization',
  templateUrl: './disable-authorization.component.html',
  styleUrls: ['./disable-authorization.component.css']
})
export class DisableAuthorizationComponent implements  OnInit {

  @Output() doClick = new EventEmitter();
  @Input() public permission: string = '';
  @Input() public type: string = 'btn'; // link, btn-icon, btn
  @Input() public url: string = '';
  @Input() public icon: string = '';
  @Input() public color: string = '';
  @Input() public text: string = '';

  public style = {};

  constructor(
      private router: Router,
      private snackBar: MatSnackBar,
      private authorization: AuthorizationService
  ) { }

  ngOnInit(): void {
    if (!this.authorization.checkPermission(this.permission)) {
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

  public onClick($event: any): void {
    if (!this.authorization.checkPermission(this.permission)) {
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

  protected notify(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

}
