import { createPool, Pool } from 'mysql';
import { createLogger, Logger } from './logger';
import dotenv from 'dotenv';
const logger: Logger = createLogger('mysql');

dotenv.config();

export let pool: Pool;

const { MysqlHost, MysqlPort = 3306, MysqlUser, MysqlPassword, MysqlDatabase, MysqlMaxConnections = 10 } = process.env;

export const createConnectionPool = () => {
  logger.info('Iniciando pool de conexões com o mysql');
  logger.info('MysqlUser: [%s]', '*'.repeat((MysqlUser || '').length));
  logger.info('MysqlPassword: [%s]', '*'.repeat((MysqlPassword || '').length));
  logger.info('MysqlHost: [%s]', MysqlHost);
  logger.info('MysqlPort: [%s]', MysqlPort);
  logger.info('MysqlDatabase: [%s]', MysqlDatabase);
  logger.info('MysqlMaxConnections: [%s]', MysqlMaxConnections);

  pool = createPool({
    connectionLimit: +MysqlMaxConnections,
    host: MysqlHost,
    port: +MysqlPort,
    user: MysqlUser,
    password: MysqlPassword,
    database: MysqlDatabase
  });
  logger.info('Pool de conexões com o mysql criado');
};

export const executeQuery = async <T>(sql: string, params: any[]) =>
  new Promise<T[]>((resolve, reject) =>
    pool.query(sql, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    })
  );
