import HttpResponse from '@shared/responses/HttpResponse';

export interface HttpRequestParams<B = any, Q = any, P = any, H = any> {
  headers?: H;
  body?: B;
  query?: Q;
  params?: P;
}

export interface UseCase {
  execute({ headers, body }: HttpRequestParams): Promise<HttpResponse<any>>;
}

export interface IHttpError {
  name: string;
  message: string;
  statusCode: number;
  extras?: any;
}

export interface RequestRouter {
  route({ headers, body }: HttpRequestParams): Promise<HttpResponse<any>>;
}
