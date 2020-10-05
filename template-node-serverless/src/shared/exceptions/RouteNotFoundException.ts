import { NOT_FOUND } from 'http-status';
import GenericException from './GenericException';

export default class RouteNotFoundException extends GenericException {
  constructor(url: string, method: string) {
    const params = {
      name: 'RouteNotFoundException',
      message: `${url} doesn't exist on this server`,
      extras: {
        help: `Method: ${method}`,
      },
      statusCode: NOT_FOUND,
    };
    super(params);

    Object.setPrototypeOf(this, RouteNotFoundException.prototype);
  }
}
