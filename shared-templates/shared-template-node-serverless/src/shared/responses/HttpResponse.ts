import { IHttpError } from '../contracts';
import { UnkownParams } from '../types';
import GenericException from '../exceptions/GenericException';

interface HttpResponseSuccessParams<T> {
  statusCode?: number;
  status?: number;
  body: T;
  deprecated?: string;
  headers?: {
    [k: string]: string;
  };
  success?: boolean;
}
export default abstract class HttpResponse<T> {
  statusCode: number;
  success: boolean;
  body: T;
  headers?: UnkownParams;
  deprecated?: string;

  static error(e: GenericException, headers?: any): HttpResponse<IHttpError> {
    if (!headers) {
      headers = {};
    }
    return {
      statusCode: e.statusCode,
      success: false,
      body: e.formatError ? e.formatError() : null,
      headers,
    };
  }

  static success<G>({ body, headers, statusCode, success, status, deprecated }: HttpResponseSuccessParams<G>): HttpResponse<G> {
    if (!headers) {
      headers = {};
    }
    return {
      success: success ?? true,
      statusCode: status ?? statusCode ?? 200,
      body,
      headers,
      deprecated,
    };
  }
}
