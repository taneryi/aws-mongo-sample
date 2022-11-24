import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SampleDocument,
  SampleEntity,
} from 'src/app/sample/entity/sample.entity';
@Injectable()
export class SampleRepository {
  constructor(
    @InjectModel(SampleEntity.name)
    private sampleEntity: Model<SampleDocument>,
  ) {}

  public async create(sampleEntity: SampleEntity): Promise<SampleDocument> {
    sampleEntity.createdAt = new Date();
    const entity = new this.sampleEntity(sampleEntity);
    return entity.save();
  }
}
