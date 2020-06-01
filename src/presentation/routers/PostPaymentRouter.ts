import { IHttpRequest, Router, IHttpResponse } from "../interfaces";
import { inject, injectable } from "inversify";
import InjectionReferences from "../../container/inversify.references";
import PaymentUseCase from "../../domain/PaymentUseCase";

interface IPostPaymentRequest {
  id: number;
}

@injectable()
export default class PostPaymentRouter implements Router {
  @inject(InjectionReferences.PaymentUseCaseRef)
  private paymentUseCase: PaymentUseCase;

  route(req: IHttpRequest<IPostPaymentRequest>): Promise<IHttpResponse> {
    const { id } = req.query;
    return this.paymentUseCase.payBill(id);
  }
}