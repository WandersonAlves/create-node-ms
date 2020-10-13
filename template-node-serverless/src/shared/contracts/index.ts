import { TRestParameters } from '../types';

export interface IPaginationRequestParams {
  skip?: number;
  limit?: number;
}

export interface UseCase {
  execute(any?: any): Promise<IHttpResponse>;
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

export interface RequestRouter {
  route(req: IHttpRequest): Promise<IHttpResponse>;
}
