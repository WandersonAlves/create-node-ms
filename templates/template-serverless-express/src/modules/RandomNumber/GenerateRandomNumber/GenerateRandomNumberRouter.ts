import { HttpRequestParams, RequestRouter } from '@shared/contracts';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import GenerateRandomNumberCase from '@modules/RandomNumber/GenerateRandomNumber/GenerateRandomNumberCase';

@provide(GenerateRandomNumberRouter)
export default class GenerateRandomNumberRouter implements RequestRouter {
  @inject(GenerateRandomNumberCase) private case: GenerateRandomNumberCase;

  async route({ headers }: HttpRequestParams<any>) {
    return await this.case.execute({ headers });
  }
}
