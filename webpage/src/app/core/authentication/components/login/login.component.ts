import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services/authentication.service';
import { RedirectService } from '../../../resource/services/redirect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = false;

  public form: FormGroup = new FormGroup({});

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private snackBar: MatSnackBar,
      private location: RedirectService,
      private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
      this.form = this.fb.group({
        email: [null, Validators.compose([Validators.required])],
        password: [null, Validators.compose([Validators.required])]
      });

      this.authenticationService.logout();
  }

  public onSubmit(): void {

    this.isLoading = true;

    const credentials = this.form.value;

    this.authenticationService.login(credentials)
        .pipe(first())
        .subscribe((response) => {
          if (response && response.user) {
            this.notify('Successfully logged in. Welcome!');
            // this.router.navigate(['/']);
          } else {
            this.notify('No user found.');
          }
          this.isLoading = false;
        }, () => {
          this.notify('Error while logging in. Please check the credentials provided.');
          this.isLoading = false;
        });

  }

  private notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }

}
