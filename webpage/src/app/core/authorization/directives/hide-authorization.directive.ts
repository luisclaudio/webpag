import { AfterContentInit, ContentChild, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';

import { AuthorizationService } from '../servises/authorization.service';

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
        private authorization: AuthorizationService
    ) {}


    ngAfterContentInit(): void {
        if (!this.authorization.checkPermission(this.permission)) {
            this.matElement = this.matBtn || this.matAnchor;
            this.matElement ? this.renderer.setStyle(this.el.nativeElement, 'display', 'none') : this.el.nativeElement.remove();
        }
    }

}

