import 'reflect-metadata';
import { DatabaseConnection } from './infra/interfaces';
import { logger } from './shared/Logger';
import container from './container/inversify.config';
import env from './config/env';
import InjectionReferences from './container/inversify.references';
import server from './presentation/express-server/server';

server.listen(env.server_port, async () => {
  await container.get<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).connect();
  logger.info(`Server started at ${env.server_port} port`);
});