/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import GenericException from '@shared/exceptions/GenericException';
import HttpResponse from '@shared/responses/HttpResponse';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default function ExceptionHandler(target: object, name: string | symbol, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = async function (...args) {
    try {
      return await original.apply(this, args);
    } catch (err) {
      console.error(err);
      return HttpResponse.error(
        new GenericException({
          name: err.name,
          message: err.message,
          statusCode: err?.response?.status,
          extras: {
            data: err?.response?.data,
            url: err?.response?.config?.url,
            method: err?.response?.config?.method,
          },
        }),
      );
    }
  };
  return descriptor;
}
