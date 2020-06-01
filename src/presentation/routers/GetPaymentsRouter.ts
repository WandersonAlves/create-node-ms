import { inject, injectable } from 'inversify';
import { Router, IHttpRequest, IHttpResponse } from '../interfaces';
import InjectionReferences from '../../container/inversify.references';
import PaymentModel from '../../models/PaymentModel';
import PaymentUseCase from '../../domain/PaymentUseCase';

@injectable()
export default class GetPaymentsRouter implements Router {
  @inject(InjectionReferences.PaymentUseCaseRef)
  private paymentUseCase: PaymentUseCase;

  route(req: IHttpRequest<null>): Promise<IHttpResponse<PaymentModel[]>> {
    return this.paymentUseCase.getBills();
  }
}
