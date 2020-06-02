import { CREATED, OK } from 'http-status';
import { DataRepository } from '../infra/interfaces';
import { IHttpResponse } from '../presentation/interfaces';
import { injectable, inject } from 'inversify';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';
import PaymentModel from '../models/Payment/PaymentModel';

@injectable()
export default class PaymentUseCase {
  @inject(InjectionReferences.PaymentRepositoryRef) private repository: DataRepository<PaymentModel>;

  async payBill(pendingPaymentID: number): Promise<IHttpResponse> {
    try {
      const result = await this.repository.updateById(pendingPaymentID, { status: 'paid' });
      if (!result) {
        return HttpResponseFactory.error("Can't update bill");
      }
      return HttpResponseFactory.success(CREATED, result);
    } catch (e) {
      return HttpResponseFactory.error(e.message);
    }
  }

  async createPayment(payment: PaymentModel): Promise<IHttpResponse> {
    try {
      const paymentModel = new PaymentModel(payment);
      const result = await this.repository.create(paymentModel);
      return HttpResponseFactory.success(CREATED, result);
    } catch (e) {
      return HttpResponseFactory.error(e.message);
    }
  }

  async getBills(): Promise<IHttpResponse> {
    const result = await this.repository.find();
    return HttpResponseFactory.success(OK, result);
  }
}
