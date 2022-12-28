import 'reflect-metadata';
import { Container } from 'inversify';
import { Newable } from '@shared/types';
import { RequestRouter, UseCase } from '@shared/contracts';
import AxiosHttpHandle from '@infra/http/AxiosHttpHandler';

export default class TestContainer<T = UseCase | RequestRouter> {
  private _ref: Newable<T>;
  private _container: Container;

  constructor(obj: Newable<T>) {
    const container = new Container({});
    container.bind(AxiosHttpHandle).toSelf();
    container.bind(obj).toSelf();
    this._ref = obj;
    this._container = container;
  }

  get() {
    return this._container.get<T>(this._ref);
  }

  add<TT = UseCase | RequestRouter>(obj: Newable<TT>) {
    this._container.bind(obj).toSelf();
    return this;
  }

  addDynamicValue<TT>(obj: Newable<TT>) {
    this._container.bind(obj).toDynamicValue(() => new obj());
    return this;
  }

  addDynamicValueWithAlias<TT>(alias: string, obj: Newable<TT>) {
    this._container.bind<TT>(alias).toDynamicValue(() => new obj());
    return this;
  }
}
