import { HTTPHandler, IHTTPHandlerParams, IHttpResponse } from "../interfaces";
import { injectable } from "inversify";
import Axios, { AxiosInstance } from 'axios';

@injectable()
export default class AxiosHttpHandle implements HTTPHandler {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = Axios.create();
  }

  async post<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>> {
    const { data, status } = await this._axios.post<T>(url, params.data, params);
    return {
      body: data,
      statusCode: status
    };
  }

  async put<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>> {
    const { data, status } = await this._axios.post(url, params.data, params);
    return {
      body: data,
      statusCode: status,
    };
  }

  async patch<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>> {
    const { data, status } = await this._axios.post(url, params.data, params);
    return {
      body: data,
      statusCode: status,
    };
  }

  async delete<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>> {
    const { data, status } = await this._axios.delete(url, params);
    return {
      body: data,
      statusCode: status,
    };
  }

  async get<T>(url: string, params?: IHTTPHandlerParams): Promise<IHttpResponse<T>> {
    const { data, status } = await this._axios.get<T>(url, params);
    return {
      body: data,
      statusCode: status,
    };
  }

}