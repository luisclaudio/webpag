import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'go-back-button',
    templateUrl: './go-back-button.component.html',
    styleUrls: ['./go-back-button.component.css']
})
export class GoBackButtonComponent {

    @Input() public link: string = '';

    constructor(private router: Router, private location: Location) { }

    goBack() {
        if (this.link){
            this.router.navigate([this.link]);
        } else {
            this.location.back();
        }
    }

}
