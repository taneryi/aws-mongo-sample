import { Module } from '@nestjs/common';
import { SampleModule } from '../sample/sample.module';
import { eventConsumer } from './eventConsumer';
import { SQSClient } from './sqsClient';

@Module({
  imports: [SampleModule],
  controllers: [],
  providers: [SQSClient, eventConsumer],
})
export class EventsModule {}
