import { DataRepository } from '../shared/interfaces';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable } from 'inversify';
import { TRestParameters } from '../shared/types';

@injectable()
export default class D_Entity_DUpperInMemoryRepository implements DataRepository<ID_Entity_DDTO> {
  private D_entity_DPlural: ID_Entity_DDTO[] = [];

  find(filter?: TRestParameters<ID_Entity_DDTO>): Promise<ID_Entity_DDTO[]> {
    const result = this.D_entity_DPlural.filter(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  findOne(filter?: TRestParameters<ID_Entity_DDTO>): Promise<ID_Entity_DDTO> {
    const result = this.D_entity_DPlural.find(u => this._match(u, filter));
    return Promise.resolve(result);
  }

  create(obj: ID_Entity_DDTO): Promise<ID_Entity_DDTO> {
    this.D_entity_DPlural.push(obj);
    return Promise.resolve(obj);
  }

  updateById(id: string | number, obj: Partial<ID_Entity_DDTO>): Promise<ID_Entity_DDTO> {
    this.D_entity_DPlural[id] = { ...this.D_entity_DPlural[id], ...obj };
    return Promise.resolve(this.D_entity_DPlural[id]);
  }

  removeById(id: string | number): Promise<null> {
    this.D_entity_DPlural = this.D_entity_DPlural.filter(e => e.id !== id);
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
