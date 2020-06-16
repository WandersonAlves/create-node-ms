import { Request, Response } from "express";
import { RequestRouter, IHttpRequest, IHttpResponse } from "../../../shared/interfaces";

export default class ExpressRouterAdapter {
  static adapt(router: RequestRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      };
      const httpResponse: IHttpResponse = await router.route(httpRequest);
      return res.status(httpResponse.statusCode).json(httpResponse);
    }
  }
}