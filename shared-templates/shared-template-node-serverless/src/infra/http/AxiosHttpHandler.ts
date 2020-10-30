import { injectable } from 'inversify';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@injectable()
export default class AxiosHttpHandle {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = Axios.create();
  }

  post<T>(url: string, data: any, params?: AxiosRequestConfig) {
    return this._axios.post<T>(url, data, params);
  }

  put<T>(url: string, data: any, params?: AxiosRequestConfig) {
    return this._axios.post<T>(url, data, params);
  }

  patch<T>(url: string, data: any, params?: AxiosRequestConfig) {
    return this._axios.post<T>(url, data, params);
  }

  delete(url: string, params?: AxiosRequestConfig) {
    return this._axios.delete(url, params);
  }

  get<T>(url: string, params?: AxiosRequestConfig) {
    return this._axios.get<T>(url, params);
  }
}
