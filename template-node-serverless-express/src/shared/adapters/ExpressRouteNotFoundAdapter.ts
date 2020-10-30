import { NOT_FOUND } from 'http-status';
import { Request, Response } from 'express';
import RouteNotFoundException from '../exceptions/RouteNotFoundException';

export default class ExpressRouteNotFoundAdapter {
  static adapt() {
    return (req: Request, res: Response) => {
      const originalUrl = req.originalUrl;
      const method = req.method;
      return res.status(NOT_FOUND).json(new RouteNotFoundException(originalUrl, method).formatError());
    };
  }
}
