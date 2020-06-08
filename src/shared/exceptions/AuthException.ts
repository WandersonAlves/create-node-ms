import { UNAUTHORIZED } from 'http-status';
import GenericException from './GenericException';

export default class AuthException extends GenericException {
  static JWTExpiredOrNotReceived = 'JWTExpiredOrNotReceived';
  static LoginDontExists = 'LoginDontExists';
  static LoginPasswordNotAllowed = 'LoginPasswordNotAllowed';
  static messageValues = {
    JWTExpiredOrNotReceived: 'JWT expired or not received',
    LoginDontExists: 'Unable to login: email not found',
    LoginPasswordNotAllowed: 'Unable to login: wrong password',
  };
  static helpValues = {
    JWTExpiredOrNotReceived: 'Maybe we forget to setup Unauthorized file',
    LoginDontExists: 'Check your email',
    LoginPasswordNotAllowed: 'Check your password. Maybe reset them?',
  };
  /**
   * Creates a new AuthException
   * @param type A type of auth exception. This type SHOULD be one of AuthException static members
   */
  constructor(type: string) {
    const params = {
      name: 'AuthException',
      message: AuthException.messageValues[type],
      statusCode: UNAUTHORIZED,
      extras: {
        help: AuthException.helpValues[type],
      },
    };
    super(params);

    Object.setPrototypeOf(this, AuthException.prototype);
  }
}
