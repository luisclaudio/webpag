import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.authenticationService.checkToken()) {
            let token = this.authenticationService.getToken();
            const authReq = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return next.handle(authReq);
        }
        return next.handle(request);
    }
}
