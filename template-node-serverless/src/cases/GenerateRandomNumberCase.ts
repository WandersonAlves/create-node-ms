import { IHttpResponse, IHttpError, UseCase } from '../shared/contracts';
import { injectable } from 'inversify';
import { OK } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../shared/factory/HttpResponseFactory';

@injectable()
export default class GenerateRandomNumberCase implements UseCase {
  @ExceptionHandler()
  async execute(): Promise<IHttpResponse<{ number: number } | IHttpError>> {
    return HttpResponseFactory.success(OK, { number: Math.floor(Math.random() * (10 - 1 + 1)) + 1 });
  }
}
