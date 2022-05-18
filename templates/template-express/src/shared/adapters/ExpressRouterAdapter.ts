import { HttpRequestParams, RequestRouter } from '@shared/contracts';
import { Request, Response } from 'express';

export default class ExpressRouterAdapter {
  /**
   *
   * @param router A RequesRouter instance
   */
  static adapt(router: RequestRouter) {
    return async (req: Request, resp: Response) => {
      const normalizedHeaders: { [k: string]: string } = ExpressRouterAdapter.NormalizeHeaders(req);
      const httpRequest: HttpRequestParams = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: normalizedHeaders,
      };
      const httpResponse = await router.route(httpRequest);
      return resp.status(httpResponse.statusCode).json(httpResponse);
    };
  }

  private static NormalizeHeaders(req: Request): { [k: string]: string } {
    return Object.keys(req.headers).reduce((destination, key) => {
      destination[key.toLowerCase()] = req.headers[key];
      return destination;
    }, {});
  }
}
