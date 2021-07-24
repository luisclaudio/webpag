import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { ResourceFormComponent } from "../../../resource/components/resource-form.component";

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends ResourceFormComponent<User> implements OnInit {

    public hide_password = true;
    public hide_c_password = true;

    constructor(
        protected injector: Injector,
        private userService: UsersService
    ) {
        super(
            injector,
            userService
        );
    }

    get redirectRoutes(): { create: string; update: string } {
        return {
            create: 'register/user',
            update: 'register/user'
        };
    }

    protected loadForm(): void {
        const data = {
            id: this.resource!.id,
            name: this.resource!.name,
            email: this.resource!.email,
            is_active: this.resource!.is_active
        };
        this.resourceForm.patchValue(data);
    }

    protected buildResourceForm(): void {
        if (this.resource_id) {
            this.resourceForm = this.fb.group({
                id: [null],
                name: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                phone_number: [''],
                uf: ['', [Validators.required]],
                profile: ['', [Validators.required]],
                is_active: [1, [Validators.required]],
            });
        } else {
            this.resourceForm = this.fb.group({
                name: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                phone_number: [''],
                uf: ['', [Validators.required]],
                profile: ['', [Validators.required]],
                password: ['', [Validators.required]],
                c_password: ['', [Validators.required]],
                is_active: [1, [Validators.required]],
            });
        }
    }
}
