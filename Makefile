mongo-pull:
	docker pull mongo

mongo-run:
	docker run --name mongo -p 27017:27017 -d mongo

redis-pull:
	docker pull redis

redis-run:
	docker run --name redis -p 6379:6379 -d redis

setup:
	make mongo-pull
	make mongo-run
	make redis-pull
	make redis-run
	cd ./mic-users && yarn install --force
	
dev:
	cd ./mic-users && yarn start:dev