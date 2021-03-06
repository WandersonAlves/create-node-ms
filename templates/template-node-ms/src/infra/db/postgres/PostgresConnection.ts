import { createConnection, Connection } from 'typeorm';
import { DatabaseConnection } from '../../../shared/contracts';
import { D_Entity_DModel } from './models/D_Entity_DModel';
import { injectable } from 'inversify';
import { logger } from '../../../shared/Logger';
import env from '../../config/env';

@injectable()
export default class PostgresConnection implements DatabaseConnection {
  private connection: Connection;

  async connect(): Promise<this> {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: env.db_host,
        port: env.db_port,
        username: env.db_user,
        password: env.db_pass,
        synchronize: true,
        entities: [D_Entity_DModel],
      });
      this.connection = connection;
      return this;
    } catch (e) {
      logger.error(e, { label: 'postgres' });
      process.exit(1);
    }
  }

  disconnect(): Promise<void> {
    return this.connection.close();
  }
}
