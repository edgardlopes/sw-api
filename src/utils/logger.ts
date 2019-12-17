import { createLogger as winstonCreateLogger, format, Logger as WinstonLogger, transports } from 'winston';

const { Console, File } = transports;

const debug = !['prd', 'production', 'prod'].includes((process.env.ECSEnvironment || process.env.ENVIRONMENT || 'dev').toLowerCase());

export declare type Logger = WinstonLogger;

export const createLogger = (name: string): Logger => winstonCreateLogger({
  defaultMeta: { name },
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.splat(),
    format.simple(),
    format.printf(event => `${event.timestamp} [${event.level}] [${event.name}] ${event.message}`)
  ),
  transports: [
    new Console({
      level: debug ? 'debug' : 'info'
    }),
    new File({
      filename: 'stderr.log',
      level: 'error',
      format: (
        format.logstash()
      )
    })
  ]
});

export const logger = createLogger('app');
