import * as httpCodes from 'http-status';
import GenericException from './GenericException';

export default class UnprocessableD_Entity_DException extends GenericException {
  constructor(errors: any) {
    const params = {
      name: 'UnprocessableD_Entity_DException',
      message: 'Fields validation failed',
      extras: errors,
      statusCode: httpCodes.UNPROCESSABLE_ENTITY,
    };
    super(params);

    Object.setPrototypeOf(this, UnprocessableD_Entity_DException.prototype);
  }
}
