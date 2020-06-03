import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse } from "../../interfaces";
import InjectionReferences from "../../../container/inversify.references";
import PaymentUseCase from "../../../domain/PaymentUseCase";

@injectable()
export default class GetPaymentRouter implements RequestRouter {
  @inject(InjectionReferences.PaymentUseCaseRef)
  private paymentUseCase: PaymentUseCase;

  route(req: IHttpRequest<{id: string}>): Promise<IHttpResponse<any>> {
    return this.paymentUseCase.getItem(req.query.id);
  }
}