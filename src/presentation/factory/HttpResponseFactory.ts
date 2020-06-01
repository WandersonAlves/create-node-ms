import { IHttpResponse } from "../interfaces";
import { INTERNAL_SERVER_ERROR } from 'http-status';

interface IHttpError {
  reason: string;
  statusCode: number;
  details?: any;
}

export default class HttpResponseFactory {
  static error(msg: string, statusCode = INTERNAL_SERVER_ERROR, details?: any): IHttpResponse<IHttpError> {
    return {
      statusCode,
      body: {
        reason: msg,
        statusCode,
        details
      }
    }
  }

  static success<T>(statusCode: number, response: T): IHttpResponse<T> {
    return {
      statusCode,
      body: response
    }
  }
}