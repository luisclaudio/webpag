import { Injectable } from "@angular/core";

import { HttpAdapter } from "./http.adapter";
import { ProductModel, ProductApiModel } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAdapter extends HttpAdapter<ProductModel | ProductApiModel>  {

  adaptFromApi(item: any): ProductModel {
    return new ProductModel(
      item.id,
      item.name,
      item.description,
      item.price
    );
  }

  adaptToApi(item: any): ProductApiModel {
    return new ProductApiModel(
      item.name,
      item.description,
      item.price,
      item.id,
    );
  }
}
