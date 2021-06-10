import { TRestParameters, UnkownParams } from '../types';
import HttpResponse from '../responses/HttpResponse';

export interface IPaginationRequestParams {
  skip?: number;
  limit?: number;
}

export interface UseCaseParams<H = any, B = any, Q = any> {
  headers?: H;
  body?: B;
  query?: Q;
}

export interface UseCase {
  execute({ headers, body }: UseCaseParams): Promise<HttpResponse<any>>;
}

export interface DataRepository<T = any> {
  find(filter?: TRestParameters<T>): Promise<T[]>;
  findOne(filter?: TRestParameters<T>): Promise<T>;

  create(obj: T): Promise<T>;
  updateById(id: string | number, obj: Partial<T>): Promise<T>;
  removeById(id: string | number): Promise<null>;
}

export interface DatabaseConnection {
  connect(): Promise<this>;
  disconnect(): Promise<void>;
}

export interface IHttpRequest<BODY = any, QUERY = any, PARAMS = any, HEADERS = any> {
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
