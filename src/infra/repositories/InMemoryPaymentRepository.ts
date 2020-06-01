import { DataRepository } from "../interfaces";
import { injectable } from "inversify";
import PaymentModel from "../../models/PaymentModel";

@injectable()
export default class InMemoryPaymentRepository implements DataRepository<PaymentModel> {

  private data: PaymentModel[] = [];
  find(): Promise<PaymentModel[]> {
    return Promise.resolve(this.data);
  }

  create(obj: PaymentModel): Promise<PaymentModel> {
    this.data.push(obj);
    return Promise.resolve(obj);
  }

  findOne(id: string): Promise<PaymentModel> {
    return Promise.resolve(this.data.find(i => i.uuid === id))
  }

  updateById(id: string | number, obj: Partial<PaymentModel>): Promise<PaymentModel> {
    throw new Error("Method not implemented.");
  }

}