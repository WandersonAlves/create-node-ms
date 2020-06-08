import { IHttpResponse, IHttpError } from "../interfaces";
import GenericException from "../../shared/exceptions/GenericException";

export default class HttpResponseFactory {
  static error(e: GenericException): IHttpResponse<IHttpError> {
    return {
      statusCode: e.statusCode,
      success: false,
      body: e.formatError()
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