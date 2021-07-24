import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { ResourceModel } from '../models/resource.model';
import { ResponseModel, MetaModel } from '../models/response.model';
import { HttpAdapter } from '../adapter/http.adapter';

export abstract class ResourceWithParentService<T extends ResourceModel> {

    public readonly url = environment.baseApi;

    public meta$: BehaviorSubject<MetaModel | null> = new BehaviorSubject<MetaModel | null>(null);
    protected http: HttpClient;

    protected constructor(
        protected parent_path: string,
        protected child_path: string,
        protected injector: Injector,
        protected adapter: HttpAdapter<any>
    ) {
        this.http = this.injector.get(HttpClient);
    }

    abstract get resourceName(): string;

    public fetch(parent_id:number, param: any): Observable<T[]> {
        let params = new HttpParams();

        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                params = params.append(key, `${param[key]}`);
            }
        }

        return this.http.get<ResponseModel<T[]>>(`${this.url}/${this.parent_path}/${parent_id}/${this.child_path}`, { params: param })
            .pipe(
                map((response) => {
                  if (response && response.meta) {
                    this.meta$.next(response.meta);
                  }
                  if (response && response.data && response.data.length > 0) {
                    return response.data.map(item => this.adapter.adaptFromApi(item));
                  }
                  return [];
                })
            );
    }

    public get(parent_id:number, id: number): Observable<T> {
        return this.http.get<ResponseModel<T>>(`${this.url}/${this.parent_path}/${parent_id}/${this.child_path}/${id}`)
          .pipe(
              map(response => {
                  return this.adapter.adaptFromApi(response.data);
              })
          );
    }

    public store(parent_id: number, data: any): Observable<T> {
        return this.http.post<ResponseModel<T>>(`${this.url}/${this.parent_path}/${parent_id}/${this.child_path}`, this.adapter.adaptToApi(data)).pipe(
            map(response => {
                return this.adapter.adaptFromApi(response.data);
            })
        );
    }

    public update(parent_id: number, data: any): Observable<T> {
        return this.http.put<ResponseModel<T>>(`${this.url}/${this.parent_path}/${parent_id}/${this.child_path}/${data.id}`, this.adapter.adaptToApi(data)).pipe(
            map(response => {
                return this.adapter.adaptFromApi(response.data);
            })
        );
    }

    public delete(parent_id: number, id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${this.parent_path}/${parent_id}/${this.child_path}/${id}`);
    }
}
