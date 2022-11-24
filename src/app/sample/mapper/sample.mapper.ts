import { samplePayload } from 'src/app/events/eventPayload';
import { SampleEntity } from '../entity/sample.entity';

export function mapToEntity(samplePayload: samplePayload): SampleEntity {
  return {
    surname: samplePayload.surname,
    age: samplePayload.age,
    name: samplePayload.name,
  };
}
