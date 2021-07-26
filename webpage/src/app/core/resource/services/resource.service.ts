import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { ResourceModel } from '../models/resource.model';
import { APIResponse } from '../models/APIResponse';
import { HttpAdapter } from '../adapter/http.adapter';

export abstract class ResourceService<T extends ResourceModel> {

    public readonly url = environment.baseApi;

    public meta$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    protected http: HttpClient;

    protected constructor(
        protected path: string,
        protected injector: Injector,
        protected adapter: HttpAdapter<any>
    ) {
        this.http = this.injector.get(HttpClient);
    }

    public setNewPath(newPath: string){
      this.path = newPath;
    }

    abstract get resourceName(): string;

    public getPagination(): Observable<number> {
        return this.meta$.asObservable();
    }

    public fetch(param: any): Observable<T[]> {
        let params = new HttpParams();

        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                params = params.append(key, `${param[key]}`);
            }
        }

        return this.http.get<APIResponse<T[]>>(`${this.url}/${this.path}`, { params: params })
            .pipe(
                map((response) => {
                    if (response && response.total) {
                      this.meta$.next(response.total);
                    }
                    if (response && response.data && response.data.length > 0) {
                      return response.data.map(item => this.adapter.adaptFromApi(item));
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
