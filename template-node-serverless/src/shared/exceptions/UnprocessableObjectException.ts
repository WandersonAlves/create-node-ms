import * as httpCodes from 'http-status';
import GenericException from './GenericException';

export default class UnprocessableObjectException extends GenericException {
  constructor(errors: any) {
    const params = {
      name: 'UnprocessableObjectException',
      message: 'Fields validation failed',
      extras: errors,
      statusCode: httpCodes.UNPROCESSABLE_ENTITY,
    };
    super(params);

    Object.setPrototypeOf(this, UnprocessableObjectException.prototype);
  }
}
