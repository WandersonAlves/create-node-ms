import { NOT_FOUND } from 'http-status';
import GenericException from './GenericException';

export default class NotFoundException extends GenericException {
  constructor(idObject) {
    const parseFields = (obj: { [param: string]: any }) => {
      let string = '';

      Object.entries(obj).forEach(el => {
        string += `${el[0]}: ${el[1]}, `;
      });

      return string;
    };
    const params = {
      name: 'NotFoundException',
      message: `Query with values ${parseFields(idObject)}not found`,
      statusCode: NOT_FOUND,
    };
    super(params);

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
