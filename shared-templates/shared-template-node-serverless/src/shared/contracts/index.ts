import { UnkownParams } from '../types';
import HttpResponse from '../responses/HttpResponse';

export interface UseCaseParams<H = any, B = any, Q = any, P = any> {
  headers?: H;
  body?: B;
  query?: Q;
  pathParams?: P;
}

export interface UseCase {
  execute({ headers, body }: UseCaseParams): Promise<HttpResponse<any>>;
}

export interface IHttpRequest<HEADERS = any, QUERY = any, PARAMS = any, BODY = any> {
  body?: BODY;
  query?: QUERY;
  params?: PARAMS;
  headers?: HEADERS;
}

export interface IHttpError<T = any> {
  name: string;
  message: string;
  statusCode: number;
  extras?: ErrorResponseBody<T>;
}

export interface ErrorResponseBody<T = UnkownParams> {
  data: T;
  url: string;
  method: string;
}

export interface RequestRouter {
  route({ headers, body }: IHttpRequest): Promise<HttpResponse<any>>;
}
