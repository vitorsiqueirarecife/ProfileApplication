import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { HealthController } from 'src/presentation/controllers/health.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/presentation/controllers/user.controller';
import { LoggerMiddleware } from '../logging/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { graphqlConfig } from '../graphql/graphql.config';
import { mongooseConfig } from '../db/mongodb/mongoose.config';
import { globalProviders } from '../providers/global.providers';
import { redisOptions } from '../cache/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UserModule,
  ],
  controllers: [HealthController, UserController],
  providers: [...globalProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
