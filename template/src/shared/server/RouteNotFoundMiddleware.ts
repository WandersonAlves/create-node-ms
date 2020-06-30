import HttpResponseFactory from '../../presentation/factory/HttpResponseFactory';
import RouteNotFoundException from '../exceptions/RouteNotFoundException';

const RouteNotFoundMiddleware = (originalUrl: string, method: string) =>
  HttpResponseFactory.error(new RouteNotFoundException(originalUrl, method));

export default RouteNotFoundMiddleware;
