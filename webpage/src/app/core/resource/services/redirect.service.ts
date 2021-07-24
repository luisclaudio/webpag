import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    readonly url = environment.baseUrl;

    public goTo (url: string): void {
        location.href = `${this.url}${url}`;
    }
}
