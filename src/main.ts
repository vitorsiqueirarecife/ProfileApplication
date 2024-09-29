import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/http/app.module';
import { ValidationPipe } from '@nestjs/common';
import {AllExceptionsFilter} from './infrastructure/exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
