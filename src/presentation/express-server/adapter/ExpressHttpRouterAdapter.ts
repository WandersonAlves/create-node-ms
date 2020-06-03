import { IHttpRequest, IHttpResponse, RequestRouter } from "../../interfaces";
import { Request, Response } from "express";

export default class ExpressRouterAdapter {
  static adapt(router: RequestRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest: IHttpRequest = {
        body: req.body,
        query: req.query
      };
      const httpResponse: IHttpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse);
    }
  }
}