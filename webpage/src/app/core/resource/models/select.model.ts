import { Injectable } from '@angular/core';
import { HttpAdapter } from '../adapter/http.adapter';

export class SelectModel {
    constructor(
        public id: string | number,
        public name: string
    ) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class SelectModelAdapter extends HttpAdapter<SelectModel | null>  {

    adaptFromApi(item: any): SelectModel {
        return new SelectModel(
            item.id,
            item.name
        );
    }

    adaptToApi(item: any): null {
        return null;
    }
}
