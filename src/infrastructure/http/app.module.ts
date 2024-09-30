import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { HealthController } from 'src/presentation/controllers/health.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/presentation/controllers/user.controller';
import { LOGGER_PROVIDER } from 'src/domain/interfaces/logger.interface';
import { WinstonLogger } from 'src/infrastructure/logging/winston.logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGO_APP_URI,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [HealthController, UserController],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useClass: WinstonLogger,
    },
  ],
})
export class AppModule {}
