import * as httpCodes from 'http-status';
import { FieldError } from '@shared/contracts';
import GenericException from '@shared/exceptions/GenericException';

export default class UnprocessableObjectException extends GenericException {
  constructor(errors: FieldError[]) {
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
