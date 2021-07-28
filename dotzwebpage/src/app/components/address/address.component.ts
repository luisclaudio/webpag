import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserModel } from './../../models/user.model';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  public isLoading = false;
  private resourceName = 'User address';

  private resource_id: number | null = null;
  public resource: UserModel | null = null;

  public resourceForm: FormGroup = new FormGroup({});

  private unSubscribeAll$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usersService: UsersService
  ) {
    this.usersService.getUser().pipe(
      takeUntil(this.unSubscribeAll$),
    ).subscribe(
      (user) => {
        if (user && user.id) {
          this.resource_id = user.id
        }
      }
    );
  }

  ngOnInit(): void {

    this.loadResource();

    this.resourceForm = this.fb.group({
      id: [null],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      county: [null, [Validators.required]],
      street: [null, [Validators.required]],
      house_number: [null, [Validators.required]],
    });
  }

  private loadResource(): void {
    if (this.resource_id) {
      this.isLoading = true;
      this.usersService.get(this.resource_id).pipe(
        takeUntil(this.unSubscribeAll$),
      ).subscribe(
        (response) => {
          if (response) {
              this.resource = response;
              this.loadForm();
          } else {
              this.notify(`Não foi possível carregar os dados de ${this.resourceName.toLowerCase()}.`);
          }
        },
        (error) => {
          this.notify(`Erro ao obter dados de ${this.resourceName.toLowerCase()}.`);
        },
        () => {
          this.isLoading = false;
      });
    }
  }

  private loadForm(): void {
    if (this.resource) {
      const data = {
        id: this.resource.id,
        country:this.resource.country,
        state:this.resource.state,
        city:this.resource.city,
        county:this.resource.county,
        street:this.resource.street,
        house_number:this.resource.house_number,
      };
      this.resourceForm.patchValue(data);
    }
  }

  public onSubmit(): void {

    if (this.resourceForm.valid) {
      this.isLoading = true;
      this.usersService.update(this.resourceForm.getRawValue()).subscribe(
          () => {
            this.notify('Address updated successfully.');
            this.isLoading = false
          },
          (error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.notify('Not found.');
            }
            if (error.status === 500) {
              this.notify('Server error.');
            }
            this.isLoading = false;
          },
          () => this.isLoading = false
      );
    }
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 5000 });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll$.next();
  }

}
