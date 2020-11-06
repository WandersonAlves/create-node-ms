import { IHttpError, RequestRouter } from '../../../shared/contracts';
import { inject, injectable } from 'inversify';
import GenerateRandomNumberCase from './GenerateRandomNumberCase';
import HttpResponse from '../../../shared/responses/HttpResponse';

@injectable()
export default class GenerateRandomNumberRouter implements RequestRouter {
  @inject(GenerateRandomNumberCase) private case: GenerateRandomNumberCase;

  route(): Promise<HttpResponse<{ number: number } | IHttpError>> {
    return this.case.execute();
  }
}
