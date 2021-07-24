import { Component, Injector } from '@angular/core';

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ResourceListComponent } from "../../../resource/components/resource-list.component";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ResourceListComponent<User> {

    constructor(
        protected injector: Injector,
        protected userService: UsersService,
    ) {
        super(injector, userService);
    }

    get displayedColumns() {
        return [
            'actions',
            'id',
            'name',
            'email',
            'is_active',
            'created_at',
        ];
    }

    protected buildSearchForm() {
        this.resourceSearchForm = this.fb.group({
            name: ['']
        });
    }

    onReset() {
        this.resourceSearchForm!.get('name')!.setValue('')
        super.onReset();
    }
}
