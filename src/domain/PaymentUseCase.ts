import { DataRepository } from '../entities/interfaces';
import { IHttpResponse, IHttpError } from '../presentation/interfaces';
import { injectable, inject } from 'inversify';
import { OK, NO_CONTENT } from 'http-status';
import { TRestParameters } from '../shared/types';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';
import IPaymentDTO from '../infra/dtos/IPaymentDTO';
import RequestHandler from '../shared/decorators/RequestHandler';

@injectable()
export default class PaymentUseCase {
  @inject(InjectionReferences.PaymentRepositoryRef) private repository: DataRepository<IPaymentDTO>;

  @RequestHandler()
  async getItems(filter?: TRestParameters<IPaymentDTO>): Promise<IHttpResponse<IPaymentDTO[] | IHttpError>> {
    const result = await this.repository.find(filter);
    if (result.length) {
      return HttpResponseFactory.success(OK, result);
    }
    return HttpResponseFactory.success(NO_CONTENT, []);
  }

  @RequestHandler()
  async getItem(id: string): Promise<IHttpResponse<IPaymentDTO | IHttpError>> {
    const result = await this.repository.findOne(id);
    if (result) {
      return HttpResponseFactory.success(OK, result);
    }
    return HttpResponseFactory.success(NO_CONTENT, null);
  }
}
