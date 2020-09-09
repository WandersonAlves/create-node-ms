import { TRestParameters } from "../types";

export interface IPaginationRequestParams {
  skip?: number;
  limit?: number;
}

export interface UseCase {
  execute(any?: any): Promise<IHttpResponse>;
}

export abstract class DataRepository<T = any> {
  abstract find(filter?: TRestParameters<T>): Promise<T[]>;
  abstract findOne(filter?: TRestParameters<T>): Promise<T>;

  abstract create(obj: T): Promise<T>;
  abstract updateById(id: string | number, obj: Partial<T>): Promise<T>;
  abstract removeById(id: string | number): Promise<null>;
}

// tslint:disable-next-line: max-classes-per-file
export abstract class DatabaseConnection {
  abstract async connect(): Promise<this>;
  abstract async disconnect(): Promise<void>;
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

// tslint:disable-next-line: max-classes-per-file
export abstract class RequestRouter {
  abstract route(req: IHttpRequest): Promise<IHttpResponse>;
}