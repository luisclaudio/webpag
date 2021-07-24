import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { ResourceModel } from '../models/resource.model';
import { HttpAdapter } from '../adapter/http.adapter';

export abstract class ResourceService<T extends ResourceModel> {

    public readonly url = environment.baseApi;

    protected http: HttpClient;

    protected constructor(
        protected path: string,
        protected injector: Injector,
        protected adapter: HttpAdapter<any>
    ) {
        this.http = this.injector.get(HttpClient);
    }

    abstract get resourceName(): string;

    public fetch(param: any): Observable<any> {
        let params = new HttpParams();

        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                params = params.append(key, `${param[key]}`);
            }
        }

        return this.http.get<T[]>(`${this.url}/${this.path}`, { params: params })
            .pipe(
                map((response) => {
                    if (response && response && response.length > 0) {
                      return response.map(item => this.adapter.adaptFromApi(item));
                    }
                    return [];
                })
            );
    }

    public get(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}/${this.path}/${id}`)
          .pipe(
              map(response => {
                  return this.adapter.adaptFromApi(response);
              })
          );
    }

    public store(data: any): Observable<T> {
        return this.http.post<T>(`${this.url}/${this.path}`, this.adapter.adaptToApi(data)).pipe(
            map(response => {
                return this.adapter.adaptFromApi(response);
            })
        );
    }

    public update(data: any): Observable<T> {
        return this.http.put<T>(`${this.url}/${this.path}/${data.id}`, this.adapter.adaptToApi(data)).pipe(
            map(response => {
                return this.adapter.adaptFromApi(response);
            })
        );
    }

    public delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${this.path}/${id}`);
    }
}
