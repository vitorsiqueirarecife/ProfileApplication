build:
	docker build -t mic-user:0.1 .

run:
	docker run --name mic-user -p 3000:3000 mic-user:0.1

mongo-pull:
	docker pull mongo

mongo-run:
	docker run --name mongo -p 27017:27017 -d mongo

redis-pull:
	docker pull redis

redis-run:
	docker run --name redis -p 6379:6379 -d redis

init:
	make build
	make mongo-pull
	make mongo-run
	make redis-pull
	make redis-run
	make run

dev:
    docker run --name mic-user-dev -p 3000:3000 -v $(pwd):/app -v /app/node_modules mic-user:0.1 npm run start:dev