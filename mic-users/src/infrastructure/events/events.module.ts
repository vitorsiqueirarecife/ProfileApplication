// src/infrastructure/aws/sns.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EVENT_SERVICE } from 'src/domain/interfaces/events.service.interface';
import { SnsService } from '../../application/services/sns.service';
import {
  SNS_CLIENT,
  SNS_TOPIC_ARN,
  snsConfig,
  topicArnConfig,
} from './aws/sns.config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EVENT_SERVICE,
      useClass: SnsService,
    },
    {
      provide: SNS_CLIENT,
      useFactory: snsConfig,
      inject: [ConfigService],
    },
    {
      provide: SNS_TOPIC_ARN,
      useFactory: topicArnConfig,
      inject: [ConfigService],
    },
  ],
  exports: [EVENT_SERVICE, SNS_CLIENT, SNS_TOPIC_ARN],
})
export class EventsModule {}
