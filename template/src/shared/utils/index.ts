import * as jwt from 'jsonwebtoken';
/**
 * Decodes a token from Authorization Header
 *
 * @returns [[UserInterface]]
 * @param jwtToken A authorization header
 */
export const decodeToken = <T>(jwtToken: string): T => {
  return jwt.decode(jwtToken.replace('Bearer ', '')) as any;
};
