import { IHttpError } from '@shared/contracts';
import GenericException from '@shared/exceptions/GenericException';

interface HttpResponseSuccessParams<T> {
  statusCode?: number;
  status?: number;
  body?: T;
  success?: boolean;
}
export default abstract class HttpResponse<T> {
  statusCode: number;
  success: boolean;
  body?: T;
  error?: IHttpError;

  static error<E extends GenericException>(e: E): HttpResponse<E> {
    return {
      statusCode: e.statusCode,
      success: false,
      error: e.formatError ? e.formatError() : e,
    };
  }

  static success<G>({ body, statusCode, success, status }: HttpResponseSuccessParams<G>): HttpResponse<G> {
    return {
      success: success ?? true,
      statusCode: status ?? statusCode ?? 200,
      body,
    };
  }
}
