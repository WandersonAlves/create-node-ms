import { DataRepository } from '../../shared/interfaces';
import { EntityModel } from '../../infra/db/postgres/models/EntityModel';
import { FindConditions } from 'typeorm';
import { IEntityDTO } from '../dtos/IEntityDTO';
import { injectable } from 'inversify';
import { TRestParameters } from '../../shared/types';

@injectable()
export default class EntityUpperPostgresRepository implements DataRepository<IEntityDTO> {
  async removeById(id: string | number): Promise<null> {
    throw new Error("Method not implemented.");
  }
  async find(filter?: TRestParameters<FindConditions<EntityModel>>): Promise<IEntityDTO[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(filter?: TRestParameters<FindConditions<EntityModel>>): Promise<IEntityDTO> {
    throw new Error('Method not implemented.');
  }

  async create(obj: IEntityDTO): Promise<IEntityDTO> {
    throw new Error('Method not implemented.');
  }

  async updateById(id: string | number, obj: Partial<IEntityDTO>): Promise<IEntityDTO> {
    throw new Error('Method not implemented.');
  }
}
