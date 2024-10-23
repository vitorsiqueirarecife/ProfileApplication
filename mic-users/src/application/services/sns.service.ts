import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { IEventService } from 'src/domain/interfaces/events.service.interface';
import {
  SNS_CLIENT,
  SNS_TOPIC_ARN,
} from '../../infrastructure/events/aws/sns.config';

@Injectable()
export class SnsService implements IEventService {
  private sns: AWS.SNS;
  private topicArn: string;

  constructor(
    @Inject(SNS_CLIENT) snsClient: AWS.SNS,
    @Inject(SNS_TOPIC_ARN) topicArn: string,
  ) {
    this.sns = snsClient;
    this.topicArn = topicArn;
  }

  async publish<T>(message: { type: string; data: T }): Promise<void> {
    const params = {
      Message: JSON.stringify(message),
      TopicArn: this.topicArn,
    };

    await this.sns.publish(params).promise();
  }
}
