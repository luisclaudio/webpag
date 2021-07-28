import { Directive, Input, ElementRef, Renderer2, ContentChild, AfterContentInit } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';

import { UsersService } from './../services/users.service';

@Directive({
    selector: '[appHideAuthorization]'
})
export class HideAuthorizationDirective implements AfterContentInit {

    @Input() permission: string = '';

    @ContentChild(MatButton) matBtn: MatButton | null = null;
    @ContentChild(MatAnchor) matAnchor: MatAnchor | null = null;

    private matElement: MatButton | MatAnchor | null = null;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private usersService: UsersService
    ) {}


    ngAfterContentInit(): void {
        if (!this.usersService.checkPermission(this.permission)) {
            this.matElement = this.matBtn || this.matAnchor;
            this.matElement ? this.renderer.setStyle(this.el.nativeElement, 'display', 'none') : this.el.nativeElement.remove();
        }
    }

}

