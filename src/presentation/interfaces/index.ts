export interface IHttpRequest<BODY = any, QUERY = any, PARAMS = any> {
  body?: BODY;
  query?: QUERY;
  params?: PARAMS;
  headers?: any;
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