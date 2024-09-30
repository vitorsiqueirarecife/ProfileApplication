import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/http/app.module';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    //TODO add CORS
  }

  await app.listen(3000);
}
bootstrap();
