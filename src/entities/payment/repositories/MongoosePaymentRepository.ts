import { DataRepository } from '../../interfaces';
import { injectable } from 'inversify';
import { PaymentMongooseModel } from '../../../infra/db/mongoose/models/PaymentMongooseModel';
import { TRestParameters } from '../../../shared/types';
import IPaymentDTO from '../../../infra/dtos/IPaymentDTO';

@injectable()
export default class MongoosePaymentRepository implements DataRepository<IPaymentDTO> {
  async find(filter?: TRestParameters<IPaymentDTO>): Promise<IPaymentDTO[]> {
    const result: IPaymentDTO[] = await PaymentMongooseModel.find().lean(true);
    return result;
  }
  findOne(id: string | number): Promise<IPaymentDTO> {
    throw new Error('Method not implemented.');
  }
  create(obj: IPaymentDTO): Promise<IPaymentDTO> {
    throw new Error('Method not implemented.');
  }
  updateById(id: string | number, obj: Partial<IPaymentDTO>): Promise<IPaymentDTO> {
    throw new Error('Method not implemented.');
  }
}
