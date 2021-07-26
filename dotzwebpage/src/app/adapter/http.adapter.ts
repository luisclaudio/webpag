export abstract class HttpAdapter<T> {
    abstract adaptFromApi(item: any): T;
    abstract adaptToApi(item: any): T;
}
