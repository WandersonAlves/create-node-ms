import { NOT_FOUND } from 'http-status';
import { Request, Response } from 'express';
import RouteNotFoundMiddleware from '../../../shared/server/RouteNotFoundMiddleware';

export default class ExpressRouteNotFoundAdapter {
  static adapt() {
    return (req: Request, res: Response) => {
      const originalUrl = req.originalUrl;
      const method = req.method;
      return res.status(NOT_FOUND).json(RouteNotFoundMiddleware(originalUrl, method));
    };
  }
}
