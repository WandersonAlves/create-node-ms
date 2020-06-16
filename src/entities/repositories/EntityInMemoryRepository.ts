import { DataRepository } from '../../shared/interfaces';
import { IEntityDTO } from '../dtos/IEntityDTO';
import { injectable } from 'inversify';
import { TRestParameters } from '../../shared/types';

@injectable()
export default class EntityUpperInMemoryRepository implements DataRepository<IEntityDTO> {
  private entityPlural: IEntityDTO[] = [];

  find(filter?: TRestParameters<IEntityDTO>): Promise<IEntityDTO[]> {
    const result = this.entityPlural.filter(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  findOne(filter?: TRestParameters<IEntityDTO>): Promise<IEntityDTO> {
    const result = this.entityPlural.find(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  create(obj: IEntityDTO): Promise<IEntityDTO> {
    this.entityPlural.push(obj);
    return Promise.resolve(obj);
  }

  updateById(id: string | number, obj: Partial<IEntityDTO>): Promise<IEntityDTO> {
    this.entityPlural[id] = { ...this.entityPlural[id], ...obj };
    return Promise.resolve(this.entityPlural[id]);
  }

  removeById(id: string | number): Promise<null> {
    this.entityPlural = this.entityPlural.filter(e => e.id !== id);
    return Promise.resolve(null);
  }

  private _match(u: IEntityDTO, filter: TRestParameters<IEntityDTO>) {
    let hasMatch = true;
    Object.entries(filter).map(k => {
      if (hasMatch) {
        const entry = k[0];
        const value = k[1];
        hasMatch = u[entry] === value ? true : false;
      }
    });
    return hasMatch;
  }
}
