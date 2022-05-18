import { HttpRequestParams, UseCase } from '@shared/contracts';
import { OK } from 'http-status';
import { provide } from 'inversify-binding-decorators';
import ExceptionHandler from '@shared/decorators/ExceptionHandler';
import HttpResponse from '@shared/responses/HttpResponse';

@provide(GenerateRandomNumberCase)
export default class GenerateRandomNumberCase implements UseCase {
  @ExceptionHandler
  async execute({ headers }: HttpRequestParams<any>) {
    const number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return HttpResponse.success({ status: OK, body: { number } });
  }
}
