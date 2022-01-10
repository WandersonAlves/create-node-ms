import * as Agent from 'agentkeepalive';
import { provide } from 'inversify-binding-decorators';
import { unmanaged } from 'inversify';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@provide(AxiosHttpHandle)
export default class AxiosHttpHandle {
  private static AgentOptions: Agent.HttpsOptions = {
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    rejectUnauthorized: false,
  };
  private static HttpAgent = new Agent(AxiosHttpHandle.AgentOptions);
  private static HttpsAgent = new Agent.HttpsAgent(AxiosHttpHandle.AgentOptions);

  private _axios: AxiosInstance;

  constructor(@unmanaged() config?: AxiosRequestConfig) {
    this._axios = Axios.create({
      httpAgent: AxiosHttpHandle.HttpAgent,
      httpsAgent: AxiosHttpHandle.HttpsAgent,
      ...config,
    });
  }

  post<T>(url: string, data?: any, params?: AxiosRequestConfig) {
    return this._axios.post<T>(url, data, params);
  }

  put<T>(url: string, data?: any, params?: AxiosRequestConfig) {
    return this._axios.put<T>(url, data, params);
  }

  patch<T>(url: string, data?: any, params?: AxiosRequestConfig) {
    return this._axios.patch<T>(url, data, params);
  }

  delete<T>(url: string, params?: AxiosRequestConfig) {
    return this._axios.delete<T>(url, params);
  }

  get<T>(url: string, params?: AxiosRequestConfig) {
    return this._axios.get<T>(url, params);
  }
}
