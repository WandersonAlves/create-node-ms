import { inject, injectable } from 'inversify';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import { TRestParameters } from '../../../shared/types';
import InjectionReferences from '../../../container/inversify.references';
import IPaymentDTO from '../../../infra/dtos/IPaymentDTO';
import PaymentUseCase from '../../../domain/PaymentUseCase';

@injectable()
export default class GetPaymentsRouter implements RequestRouter {
  @inject(InjectionReferences.PaymentUseCaseRef)
  private paymentUseCase: PaymentUseCase;

  route(req: IHttpRequest<TRestParameters<IPaymentDTO>>): Promise<IHttpResponse<IPaymentDTO[] | IHttpError>> {
    return this.paymentUseCase.getItems(req.query);
  }
}
