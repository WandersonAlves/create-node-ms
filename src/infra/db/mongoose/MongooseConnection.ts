import { Connection as MongoConnection, createConnection } from 'mongoose';
import { DatabaseConnection } from '../../interfaces';
import { injectable } from 'inversify';
import { logger } from '../../../shared/Logger';
import env from '../../../config/env';

@injectable()
export default class MongooseConnection implements DatabaseConnection {
  private db: MongoConnection;

  connect(): Promise<this> {
    return new Promise(async (resolve, reject) => {
      try {
        this.db = await createConnection(`${env.mongodb_url}`, {
          authSource: env.mongodb_authsource ? env.mongodb_authsource : null,
          ssl: env.mongodb_replset ? true : false,
          replicaSet: env.mongodb_replset ? env.mongodb_replset : null,
          dbName: env.mongodb_database_name,
          appname: 'payment-service',
        });
        if (this.db.readyState !== 1) {
          logger.error('MongoNotConnected', { label: 'MongoDB' });
          reject(this);
        }
        resolve(this);
      } catch (err) {
        logger.error(err, { label: 'MongoDB' });
        reject(err);
        process.exit(1);
      }
    });
  }

  getConnection() {
    return this.db;
  }

  startSession() {
    return this.db.startSession();
  }

  useDB(databaseName: string) {
    // @ts-ignore
    return this.db.useDb(databaseName, { useCache: true });
  }

  disconnect(): Promise<any> {
    return this.db.close();
  }
}
