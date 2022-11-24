import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SampleRepository } from 'src/infrastructure/repository/sampleRepository';
import { SampleEntity, SampleSchema } from './entity/sample.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        collection: 'sample',
        name: SampleEntity.name,
        schema: SampleSchema,
      },
    ]),
  ],
  providers: [SampleRepository],
  exports: [SampleRepository],
})
export class SampleModule {}
