import { FastifyReply, FastifyRequest } from 'fastify';
import { RequestRouter, IHttpResponse, IHttpRequest } from '../../../shared/interfaces';

export default class FastifyRouterAdapter {
  static adapt(router: RequestRouter) {
    return async (request: FastifyRequest, reply: FastifyReply<any>) => {
      const httpRequest: IHttpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers,
      };
      const httpResponse: IHttpResponse = await router.route(httpRequest);
      return reply.status(httpResponse.statusCode).send(httpResponse);
    };
  }
}
