import { IHttpError } from '../contracts';
import GenericException from '../exceptions/GenericException';

export default abstract class HttpResponse<T> {
  statusCode: number;
  success: boolean;
  body: T;

  static error(e: GenericException): HttpResponse<IHttpError> {
    return {
      statusCode: e.statusCode,
      success: false,
      body: e.formatError ? e.formatError() : null,
    };
  }

  static success<G>(statusCode: number, response: G): HttpResponse<G> {
    return {
      success: true,
      statusCode,
      body: response,
    };
  }
}
