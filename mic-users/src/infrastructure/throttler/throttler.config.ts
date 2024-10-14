import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { Redis } from 'ioredis';

export const throttlerConfig: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    throttlers: [
      {
        ttl: configService.get<number>('THROTTLE_TTL'),
        limit: configService.get<number>('THROTTLE_LIMIT'),
      },
    ],
    storage: new ThrottlerStorageRedisService(
      new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT')!),
        username: configService.get('REDIS_USER'),
        password: configService.get<string>('REDIS_PASSWORD'),
      }),
    ),
  }),
};
