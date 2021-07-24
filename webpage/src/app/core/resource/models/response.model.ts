export interface MetaModel {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: string;
    to: number;
    total: number;
}

export class ResponseModel<T> {
    public data?: T;
    public meta?: MetaModel;
}
