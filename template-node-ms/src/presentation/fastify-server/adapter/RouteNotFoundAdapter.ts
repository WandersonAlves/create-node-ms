import { FastifyRequest, FastifyReply } from 'fastify';
import { NOT_FOUND } from 'http-status';
import RouteNotFoundMiddleware from '../../../shared/server/RouteNotFoundMiddleware';

export default class ExpressRouteNotFoundAdapter {
  static adapt() {
    return (request: FastifyRequest, reply: FastifyReply<any>) => {
      const originalUrl = request.url;
      const method = request.method;
      return reply.status(NOT_FOUND).send(RouteNotFoundMiddleware(originalUrl, method));
    };
  }
}
