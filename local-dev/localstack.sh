#!/usr/bin/env bash

LOCALSTACK_URL="http://localhost:4566"
TOPIC_NAME="sample-topic"
QUEUE_NAME=sample-queue
AWS_PROFILE=sample-profile


set -euo pipefail

echo "Configuring AWS locally..."
aws configure set aws_access_key_id "test" --profile $AWS_PROFILE
aws configure set aws_secret_access_key "test" --profile $AWS_PROFILE
aws configure set region "eu-west-1" --profile $AWS_PROFILE
aws configure set output "table" --profile $AWS_PROFILE

echo "Configuring SNS Locally"
aws --endpoint-url=$LOCALSTACK_URL sns create-topic --name $TOPIC_NAME --profile $AWS_PROFILE
aws --endpoint-url=$LOCALSTACK_URL sns set-topic-attributes --topic-arn arn:aws:sns:eu-west-1:000000000000:$TOPIC_NAME --attribute-name DisplayName --attribute-value SampleTopic --profile $AWS_PROFILE
aws --endpoint-url=$LOCALSTACK_URL sns list-topics --profile $AWS_PROFILE
echo "Configured SNS successfully"

echo "Configuring SQS locally..."
aws --endpoint-url=$LOCALSTACK_URL sqs create-queue --queue-name $QUEUE_NAME  --profile $AWS_PROFILE --output table | cat
aws --endpoint-url=$LOCALSTACK_URL sqs list-queues --profile $AWS_PROFILE --output table | cat
echo "Configured SQS successfully"

echo "Subscripe to topic"
aws --endpoint-url=$LOCALSTACK_URL sns subscribe --topic-arn arn:aws:sns:eu-west-1:000000000000:$TOPIC_NAME --protocol sqs --notification-endpoint http://localhost:4566/000000000000/$QUEUE_NAME --profile $AWS_PROFILE

echo "Current subscriptions on SNS"
aws --endpoint-url=$LOCALSTACK_URL sns list-subscriptions --profile $AWS_PROFILE  --output table | cat