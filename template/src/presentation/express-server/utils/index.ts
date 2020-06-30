import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status';
import AuthException from '../../../shared/exceptions/AuthException';
import HttpResponseFactory from '../../factory/HttpResponseFactory';

export const CheckJWTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    const [, token] = authorization.split(' ');
    // TODO Set your secret
    jwt.verify(token, 'random-secret');
    next();
  } catch (e) {
    return res.status(UNAUTHORIZED).send(HttpResponseFactory.error(new AuthException(AuthException.JWTExpiredOrNotReceived)));
  }
};

