import { OK } from 'http-status';
import { UseCase, UseCaseParams } from '../../../shared/contracts';
import { injectable } from 'inversify';
import ExceptionHandler from '../../../shared/decorators/ExceptionHandler';
import HttpResponse from '../../../shared/responses/HttpResponse';

@injectable()
export default class GenerateRandomNumberCase implements UseCase {
  @ExceptionHandler
  async execute({ headers }: UseCaseParams<any>) {
    const number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return HttpResponse.success({ status: OK, body: { number } });
  }
}
