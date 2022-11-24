import { Injectable } from '@nestjs/common';
import { samplePayload } from './eventPayload';
import { SQSClient } from './sqsClient';
import { mapToEntity } from '../sample/mapper/sample.mapper';
import { SampleRepository } from 'src/infrastructure/repository/sampleRepository';
@Injectable()
export class eventConsumer {
  constructor(private sqsClient: SQSClient, private repo: SampleRepository) {}
  public consume = () => {
    setInterval(async () => {
      try {
        const message = await this.sqsClient.client
          .receiveMessage({
            QueueUrl: 'http://localhost:4566/000000000000/sample-queue',
            WaitTimeSeconds: 10,
          })
          .promise();
        console.log(message);
        const messageBody = JSON.parse(message.Messages?.[0].Body || '');
        if (messageBody && messageBody !== '') {
          const payload = JSON.parse(messageBody.Message);
          await this.handleMessage(payload);
        }

        if (message && message.Messages) {
          const deleteParams = {
            QueueUrl: 'http://localhost:4566/000000000000/sample-queue',
            ReceiptHandle: message.Messages![0].ReceiptHandle || '',
          };
          if (deleteParams) {
            const removedMessage = await this.sqsClient.client
              .deleteMessage(deleteParams, (err, data) =>
                console.log(err, data),
              )
              .promise();
            console.log('removed message', removedMessage);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 11000);
  };

  private handleMessage = async (payload: samplePayload) => {
    const entity = mapToEntity(payload);
    const document = await this.repo.create(entity);
    console.log(document);
  };
}
