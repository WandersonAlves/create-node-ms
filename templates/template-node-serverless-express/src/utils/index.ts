import { AxiosError } from 'axios';
import GenericException from '../shared/exceptions/GenericException';
import HttpResponse from '../shared/responses/HttpResponse';
import container from '../infra/container/inversify.config';

type Newable<T> = new (...args: any[]) => T;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);

export const CreateGenericError = (err: AxiosError) =>
  HttpResponse.error(
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
