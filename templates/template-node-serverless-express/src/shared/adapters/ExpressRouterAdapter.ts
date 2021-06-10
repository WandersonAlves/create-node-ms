import { IHttpRequest, RequestRouter } from '../contracts';
import { Request, Response } from 'express';

export default class ExpressRouterAdapter {
  /**
   *
   * @param router A RequesRouter instance
   */
  static adapt(router: RequestRouter) {
    return async (req: Request, resp: Response) => {
      const normalizedHeaders: { [k: string]: string } = ExpressRouterAdapter.NormalizeHeaders(req);
      const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.apiGateway.event.pathParameters,
        query: req.apiGateway.event.queryStringParameters,
        headers: normalizedHeaders,
      };

      const detailedResponse = req?.apiGateway?.event?.headers?.detailedResponse ? true : false;
      const httpResponse = await router.route(httpRequest);

      return resp.json(detailedResponse ? httpResponse : httpResponse.body);
    };
  }

  private static NormalizeHeaders(req: Request): { [k: string]: string } {
    return Object.keys(req.apiGateway.event.headers).reduce((destination, key) => {
      destination[key.toLowerCase()] = req.apiGateway.event.headers[key];
      return destination;
    }, {});
  }
}
