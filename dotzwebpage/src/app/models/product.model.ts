export class ProductModel {

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: string
  ) { }
}

export class ProductApiModel {

  constructor(
    public name: string,
    public description: string,
    public price: string,
    public id?: number,
  ) { }
}
