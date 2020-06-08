import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED, NOT_FOUND } from 'http-status';
import AuthException from '../../../shared/exceptions/AuthException';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import RouteNotFoundException from '../../../shared/exceptions/RouteNotFoundException';

export const CheckJWTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    const [, token] = authorization.split(' ');
    jwt.verify(token, 'random-secret');
    next();
  } catch (e) {
    return res.status(UNAUTHORIZED).send(HttpResponseFactory.error(new AuthException(AuthException.JWTExpiredOrNotReceived)));
  }
};

export const RouteNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(NOT_FOUND).send(HttpResponseFactory.error(new RouteNotFoundException(req.originalUrl, req.method)));
};

/**
 * Decodes a token from Authorization Header
 *
 * @returns [[UserInterface]]
 * @param jwtToken A authorization header
 */
export const decodeToken = <T>(jwtToken: string): T => {
  return jwt.decode(jwtToken.replace('Bearer ', '')) as any;
};
