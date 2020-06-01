export interface IHttpRequest<T = any> {
  body?: T;
  query?: any;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  body?: T;
}

export abstract class Router {
  abstract route(req: IHttpRequest): Promise<IHttpResponse>;
}