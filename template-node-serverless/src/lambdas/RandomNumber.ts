import 'reflect-metadata';
import { ServerlessFactory } from '../shared/factory/ServerlessFactory';
import container from '../infra/container/inversify.config';
import GenerateRandomNumberCase from '../cases/GenerateRandomNumberCase';

const useCase = container.get<GenerateRandomNumberCase>(GenerateRandomNumberCase);

export const handle = async () => {
  const result = await useCase.execute();
  return ServerlessFactory.LambdaResponse(result);
};
