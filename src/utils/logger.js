import { createLogger, transports, format } from 'winston';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: process.env.NODE_ENV === 'production'
        ? format.combine(format.timestamp(), format.json())
        : format.combine(format.colorize(), format.simple())
    }),

    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),

    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(format.timestamp(), format.json())
    })
  ],
});

export default logger;
