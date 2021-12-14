import HttpResponseFactory from '@shared/responses/HttpResponse';
import RouteNotFoundException from '@shared/exceptions/RouteNotFoundException';

const RouteNotFoundMiddleware = (originalUrl: string, method: string) =>
  HttpResponseFactory.error(new RouteNotFoundException(originalUrl, method));

export default RouteNotFoundMiddleware;
