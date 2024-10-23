import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

export const SNS_CLIENT = 'SNS_CLIENT';
export const snsConfig = (configService: ConfigService) => {
  return new AWS.SNS({
    region: configService.get<string>('AWS_REGION'),
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  });
};

export const SNS_TOPIC_ARN = 'SNS_TOPIC_ARN';

export const topicArnConfig = (configService: ConfigService) => {
  return configService.get<string>('AWS_SNS_TOPIC_ARN');
};
