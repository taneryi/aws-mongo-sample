import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './app/events/event.module';
import { SampleModule } from './app/sample/sample.module';
import { env } from './config/env';

@Module({
  imports: [
    EventsModule,
    SampleModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
        const options: MongooseModuleOptions = {
          uri: env.mongoUri,
          dbName: 'sample',
        };
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
