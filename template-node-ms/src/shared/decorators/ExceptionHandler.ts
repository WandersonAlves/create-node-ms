import { logger } from '../Logger';
import GenericException from '../exceptions/GenericException';
import HttpResponseFactory from '../../presentation/factory/HttpResponseFactory';

export default function ExceptionHandler(customFn?: (e: Error) => any) {
  return (target: object, name: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        return await original.apply(this, args);
      } catch (err) {
        logger.error(err);
        if (customFn) {
          return customFn(err);
        }
        return HttpResponseFactory.error(new GenericException({ name: err.name, message: err.message }));
      }
    };
    return descriptor;
  };
}
