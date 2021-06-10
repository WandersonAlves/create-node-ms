import { IHttpRequest, RequestRouter } from '../../../shared/contracts';
import { inject, injectable } from 'inversify';
import GenerateRandomNumberCase from './GenerateRandomNumberCase';

@injectable()
export default class GenerateRandomNumberRouter implements RequestRouter {
  @inject(GenerateRandomNumberCase) private case: GenerateRandomNumberCase;

  route({ headers }: IHttpRequest<any>) {
    return this.case.execute({ headers });
  }
}
