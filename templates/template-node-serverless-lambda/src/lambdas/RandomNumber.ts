import 'reflect-metadata';
import { APIGatewayProxyResult } from 'aws-lambda';
import GenerateRandomNumberCase from '../cases/GenerateRandomNumberCase';
import ServerlessResponse from '../shared/responses/ServerlessResponse';
import container from '../infra/container/inversify.config';

const useCase = container.get<GenerateRandomNumberCase>(GenerateRandomNumberCase);

export const handle = async (): Promise<APIGatewayProxyResult> => {
  const result = await useCase.execute();
  return ServerlessResponse.Lambda(result);
};
