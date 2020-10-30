import { IHttpError, IHttpRequest, RequestRouter } from '../../shared/contracts';
import { inject, injectable } from 'inversify';
import { logger } from '../../shared/Logger';
import GenerateRandomNumberCase from '../../cases/GenerateRandomNumberCase';
import HttpResponse from '../../shared/responses/HttpResponse';

@injectable()
export default class GetRandomNumberRouter implements RequestRouter {
  @inject(GenerateRandomNumberCase) private case: GenerateRandomNumberCase;

  route(req: IHttpRequest<any, { temp: string }, any>): Promise<HttpResponse<{ number: number } | IHttpError>> {
    logger.info(req.query.temp);
    return this.case.execute();
  }
}
