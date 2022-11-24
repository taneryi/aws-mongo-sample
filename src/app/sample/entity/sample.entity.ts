import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SampleDocument = SampleEntity & Document;

@Schema({
  collection: 'sample',
  autoCreate: false,
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
export class SampleEntity {
  @Prop()
  createdAt?: Date;
  @Prop()
  name!: string;
  @Prop()
  surname!: string;
  @Prop()
  age?: number;
}

export const SampleSchema = SchemaFactory.createForClass(SampleEntity);
