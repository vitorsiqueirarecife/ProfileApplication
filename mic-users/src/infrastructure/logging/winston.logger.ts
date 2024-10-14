import { createLogger, format, transports, Logger } from 'winston';
import { ILogger } from 'src/domain/interfaces/logger.interface';

export class WinstonLogger implements ILogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
