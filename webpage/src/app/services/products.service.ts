import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { APIResponse } from './../models/APIResponse';

import { ProductModel } from './../models/product.model';
import { ProductAdapter } from './../adapter/product.adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url = environment.baseApi;
  private meta$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private path: string = 'products';

  constructor(
    private http: HttpClient,
    private productAdapter: ProductAdapter
  ) { }

  public getPagination(): Observable<number> {
    return this.meta$.asObservable();
  }

  public fetch(param: any): Observable<ProductModel[]> {
    let params = new HttpParams();

    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            params = params.append(key, `${param[key]}`);
        }
    }

    return this.http.get<APIResponse<ProductModel[]>>(`${this.url}/${this.path}`, { params: params })
        .pipe(
            map((response) => {
                if (response && response.total) {
                  this.meta$.next(response.total);
                }
                if (response && response.data && response.data.length > 0) {
                  return response.data.map(item => this.productAdapter.adaptFromApi(item));
                }
                return [];
            })
        );
  }
}
