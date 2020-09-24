import 'reflect-metadata';
import { DatabaseConnection } from './shared/contracts';
import { logger } from './shared/Logger';
import container from './infra/container/inversify.config';
import env from './infra/config/env';
import InjectionReferences from './infra/container/inversify.references';
import server from './presentation/express-server/server';

server.listen(env.server_port, async () => {
  await container.get<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).connect();
  logger.info(`Server started at ${env.server_port} port`);
});