import { DataRepository } from '../shared/interfaces';
import { D_Entity_DModel } from '../infra/db/postgres/models/D_Entity_DModel';
import { FindConditions } from 'typeorm';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable } from 'inversify';
import { TRestParameters } from '../shared/types';

@injectable()
export default class D_Entity_DUpperPostgresRepository implements DataRepository<ID_Entity_DDTO> {
  async removeById(id: string | number): Promise<null> {
    throw new Error("Method not implemented.");
  }
  async find(filter?: TRestParameters<FindConditions<D_Entity_DModel>>): Promise<ID_Entity_DDTO[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(filter?: TRestParameters<FindConditions<D_Entity_DModel>>): Promise<ID_Entity_DDTO> {
    throw new Error('Method not implemented.');
  }

  async create(obj: ID_Entity_DDTO): Promise<ID_Entity_DDTO> {
    throw new Error('Method not implemented.');
  }

  async updateById(id: string | number, obj: Partial<ID_Entity_DDTO>): Promise<ID_Entity_DDTO> {
    throw new Error('Method not implemented.');
  }
}
