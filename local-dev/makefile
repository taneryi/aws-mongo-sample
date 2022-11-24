setup: 
	sh localstack.sh
up: docker-up
down:	docker-down
docker-up:
	docker-compose up -d
docker-down:
	docker-compose down
docker-build:
	docker-compose build
publish:
	node ./publishMessage.js