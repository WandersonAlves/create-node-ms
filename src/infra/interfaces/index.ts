export abstract class DataRepository<T = any> {
  abstract find(): Promise<T[]>;
  abstract findOne(id: string | number): Promise<T>;

  abstract create(obj: T): Promise<T>;
  abstract updateById(id: string | number, obj: Partial<T>): Promise<T>;
}

// tslint:disable-next-line: max-classes-per-file
export abstract class HTTPHandler {
  abstract async get<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async post<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async put<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async patch<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async delete<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
}

export interface IHTTPHandlerParams {
  data?: any;
  headers?: any;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  body: T;
}