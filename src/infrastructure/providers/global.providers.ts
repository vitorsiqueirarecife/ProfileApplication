import { LOGGER_PROVIDER } from 'src/domain/interfaces/logger.interface';
import { WinstonLogger } from '../logging/winston.logger';
import { AllExceptionsFilter } from '../exceptions/all-exceptions.filter';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

export const globalProviders = [
  {
    provide: LOGGER_PROVIDER,
    useClass: WinstonLogger,
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
  AllExceptionsFilter,
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
];
