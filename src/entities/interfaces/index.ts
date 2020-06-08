import { TRestParameters } from '../../shared/types';

export abstract class DataRepository<T = any> {
  abstract find(filter?: TRestParameters<T>): Promise<T[]>;
  abstract findOne(filter?: TRestParameters<T>): Promise<T>;

  abstract create(obj: T): Promise<T>;
  abstract updateById(id: string | number, obj: Partial<T>): Promise<T>;
}
