import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { HealthController } from 'src/presentation/controllers/health.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { LoggerMiddleware } from '../logging/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { mongooseConfig } from '../db/mongodb/mongoose.config';
import { globalProviders } from '../providers/global.providers';
import { redisOptions } from '../cache/redis.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from '../throttler/throttler.config';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    ThrottlerModule.forRootAsync(throttlerConfig),
    UserModule,
    AuthModule,
  ],
  controllers: [HealthController, AuthController],
  providers: [...globalProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
