import HttpResponseFactory from '../factory/HttpResponseFactory';
import RouteNotFoundException from '../exceptions/RouteNotFoundException';

const RouteNotFoundMiddleware = (originalUrl: string, method: string) =>
  HttpResponseFactory.error(new RouteNotFoundException(originalUrl, method));

export default RouteNotFoundMiddleware;
