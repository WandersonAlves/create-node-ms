import HttpResponseFactory from '../responses/HttpResponse';
import RouteNotFoundException from '../exceptions/RouteNotFoundException';

const RouteNotFoundMiddleware = (originalUrl: string, method: string) =>
  HttpResponseFactory.error(new RouteNotFoundException(originalUrl, method));

export default RouteNotFoundMiddleware;
