import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public isLoading = false;

  public form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      c_password: [null, Validators.compose([Validators.required])]
    });
  }

  public onSubmit(): void {

    this.isLoading = true;

    const credentials = {
      ...this.form.value,
      is_active: true,
    };

    this.userService.userStore(credentials)
      .subscribe(() => {
        this.notify('Registration successfully Complete. Welcome!');
        this.isLoading = false;
        this.router.navigate([ '/authentication/login' ]);
      }, () => {
        this.notify('Error registering user. Please check the credentials provided.');
        this.isLoading = false;
      });
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 5000 });
  }

}
