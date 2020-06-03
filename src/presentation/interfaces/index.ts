export interface IHttpRequest<T = any> {
  body?: T;
  query?: any;
}

export interface IHttpResponse<T = any> {
  success: boolean;
  statusCode: number;
  body?: T;
}

export interface IHttpError {
  name: string;
  message: string;
  details?: any;
}

export abstract class RequestRouter {
  abstract route(req: IHttpRequest): Promise<IHttpResponse>;
}