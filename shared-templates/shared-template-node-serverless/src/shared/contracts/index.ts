import { TRestParameters } from '../types';
import HttpResponse from '../responses/HttpResponse';

export interface IPaginationRequestParams {
  skip?: number;
  limit?: number;
}

export interface UseCaseParams<H = any, B = any> {
  headers?: H;
  body?: B;
}

export interface UseCase<Success = any, Fail = any> {
  execute(params?: UseCaseParams): Promise<HttpResponse<Success | Fail>>;
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

export interface IHttpRequest<BODY = any, QUERY = any, PARAMS = any> {
  body?: BODY;
  query?: QUERY;
  params?: PARAMS;
  headers?: any;
}

export interface IHttpError {
  name: string;
  message: string;
  statusCode: number;
  extras?: any;
}

export interface RequestRouter {
  route(req: IHttpRequest): Promise<HttpResponse<any>>;
}
