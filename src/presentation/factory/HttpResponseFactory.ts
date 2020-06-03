import { IHttpResponse, IHttpError } from "../interfaces";
import { INTERNAL_SERVER_ERROR } from 'http-status';



export default class HttpResponseFactory {
  static error(e: Error, statusCode = INTERNAL_SERVER_ERROR, details?: any): IHttpResponse<IHttpError> {
    return {
      statusCode,
      success: false,
      body: {
        name: e.name,
        message: e.message,
        details
      }
    }
  }

  static success<T>(statusCode: number, response: T): IHttpResponse<T> {
    return {
      success: true,
      statusCode,
      body: response
    }
  }
}