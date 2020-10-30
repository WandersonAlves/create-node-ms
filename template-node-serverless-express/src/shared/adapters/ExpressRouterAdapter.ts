import { IHttpRequest, RequestRouter } from '../contracts';
import { Request, Response } from 'express';
import HttpResponse from '../responses/HttpResponse';

export default class ExpressRouterAdapter {
  static adapt(router: RequestRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.apiGateway.event.pathParameters,
        query: req.apiGateway.event.queryStringParameters,
        headers: req.apiGateway.event.headers,
      };
      const httpResponse: HttpResponse<any> = await router.route(httpRequest);
      return res.status(httpResponse.statusCode).json(httpResponse);
    };
  }
}
