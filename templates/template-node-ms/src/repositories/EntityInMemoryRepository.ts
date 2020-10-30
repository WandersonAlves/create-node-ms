import { DataRepository } from '../shared/contracts';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable } from 'inversify';
import { TRestParameters } from '../shared/types';

@injectable()
export default class D_Entity_DInMemoryRepository implements DataRepository<ID_Entity_DDTO> {
  private D_entities_D: ID_Entity_DDTO[] = [];

  find(filter?: TRestParameters<ID_Entity_DDTO>): Promise<ID_Entity_DDTO[]> {
    const result = this.D_entities_D.filter(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  findOne(filter?: TRestParameters<ID_Entity_DDTO>): Promise<ID_Entity_DDTO> {
    const result = this.D_entities_D.find(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  create(obj: ID_Entity_DDTO): Promise<ID_Entity_DDTO> {
    this.D_entities_D.push(obj);
    return Promise.resolve(obj);
  }

  updateById(id: string | number, obj: Partial<ID_Entity_DDTO>): Promise<ID_Entity_DDTO> {
    this.D_entities_D[id] = { ...this.D_entities_D[id], ...obj };
    return Promise.resolve(this.D_entities_D[id]);
  }

  removeById(id: string | number): Promise<null> {
    this.D_entities_D = this.D_entities_D.filter(e => e.id !== id);
    return Promise.resolve(null);
  }

  private _match(u: ID_Entity_DDTO, filter: TRestParameters<ID_Entity_DDTO>) {
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
