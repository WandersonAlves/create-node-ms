import { AxiosError, AxiosResponse } from 'axios';
import HttpResponse from '@shared/responses/HttpResponse';

export default class ReturnHelper {
  static CaseResponse<T>(status: number, data: T, success = true): Promise<HttpResponse<T>> {
    return Promise.resolve({ body: data, statusCode: status, success });
  }
  static HttpSuccess<T>(status: number, data?: T, headers = null): Promise<AxiosResponse<T>> {
    return Promise.resolve({ data, status, headers, config: null, statusText: null });
  }

  static HttpError<T>(status: number, data?: T): Promise<AxiosError<T>> {
    return Promise.reject({ response: { data, status, headers: null, config: null, statusText: null } });
  }

  static Clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }
}
