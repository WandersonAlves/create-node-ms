import HttpResponseFactory from '../../presentation/factory/HttpResponseFactory';

export default function RequestHandler(customFn?: (e: Error) => any) {
  return (target: object, name: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        return await original.apply(this, args);
      } catch (err) {
        if (customFn) {
          return customFn(err);
        }
        return HttpResponseFactory.error(err);
      }
    };
    return descriptor;
  };
}
