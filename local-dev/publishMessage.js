/* eslint-disable @typescript-eslint/no-var-requires */
const { SNS } = require('aws-sdk');
const { samplePayload } = require('./sampleMessagePayload');

const snsClient = new SNS({
  endpoint: 'http://localhost:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test',
  region: 'eu-west-1',
});

async function publishMessage() {
  console.log('Payload:', samplePayload);
  const messageParams = {
    Message: JSON.stringify(samplePayload),
    TopicArn: 'arn:aws:sns:eu-west-1:000000000000:sample-topic',
  };
  await snsClient.publish(messageParams).promise();
}

publishMessage()
  .then(() => console.log('message published'))
  .catch((err) => console.log(err.message));
