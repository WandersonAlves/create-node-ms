import { GetFromContainer } from '@infra/container/inversify.config';
import { Newable } from '@shared/types';
import { RequestHandler } from 'express-serve-static-core';
import { Router } from 'express';
import ExpressRouterAdapter from '@shared/adapters/ExpressRouterAdapter';
/**
 * Creates a express route using the build pattern
 */
export default class RoutesBuilder {
  private _router = Router();
  get(url: string | string[], requestRouter: Newable, ...middleware: RequestHandler[]) {
    this._router.get(url, middleware, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter)));
    return this;
  }
  post(url: string | string[], requestRouter: Newable, ...middleware: RequestHandler[]) {
    this._router.post(url, middleware, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter)));
    return this;
  }
  put(url: string | string[], requestRouter: Newable, ...middleware: RequestHandler[]) {
    this._router.put(url, middleware, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter)));
    return this;
  }
  delete(url: string | string[], requestRouter: Newable, ...middleware: RequestHandler[]) {
    this._router.delete(url, middleware, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter)));
    return this;
  }
  patch(url: string | string[], requestRouter: Newable, ...middleware: RequestHandler[]) {
    this._router.patch(url, middleware, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter)));
    return this;
  }
  build() {
    return this._router;
  }
}
