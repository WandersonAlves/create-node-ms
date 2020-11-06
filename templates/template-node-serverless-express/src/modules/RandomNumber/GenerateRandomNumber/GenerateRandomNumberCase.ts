import { IHttpError, UseCase } from '../../../shared/contracts';
import { OK } from 'http-status';
import { injectable } from 'inversify';
import ExceptionHandler from '../../../shared/decorators/ExceptionHandler';
import HttpResponse from '../../../shared/responses/HttpResponse';

@injectable()
export default class GenerateRandomNumberCase implements UseCase {
  @ExceptionHandler()
  async execute(): Promise<HttpResponse<{ number: number } | IHttpError>> {
    const number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return HttpResponse.success(OK, { number });
  }
}
