import { IHttpResponse } from "../../presentation/interfaces";

export abstract class HTTPHandler {
  abstract async get<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async post<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async put<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async patch<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
  abstract async delete<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>>;
}

// tslint:disable-next-line: max-classes-per-file
export abstract class DatabaseConnection {
  abstract async connect(): Promise<this>;
  abstract async disconnect(): Promise<void>;
}

export interface IHTTPHandlerParams {
  data?: any;
  headers?: any;
}