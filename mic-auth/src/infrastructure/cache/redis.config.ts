import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

// run (to redis work): redis-server --daemonize yes
export const redisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    socket: {
      host: configService.get<string>('REDIS_HOST'),
      port: parseInt(configService.get<string>('REDIS_PORT')!),
      username: configService.get('REDIS_USER'),
      password: configService.get<string>('REDIS_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};
