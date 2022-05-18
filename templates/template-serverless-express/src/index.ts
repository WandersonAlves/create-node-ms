import 'reflect-metadata';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import server from '@server/index';

export const handler = (event: APIGatewayEvent, context: Context) => {
  proxy(createServer(server), event, context);
};
