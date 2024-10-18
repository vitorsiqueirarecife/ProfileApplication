mongo-pull:
	docker pull mongo

mongo-run:
	docker run --name mongo -p 27017:27017 -d mongo

redis-pull:
	docker pull redis

redis-run:
	docker run --name redis -p 6379:6379 -d redis

ROOT_DIR := $(CURDIR)
MIC_USER_DIR := $(ROOT_DIR)/mic-users
MIC_AUTH_DIR := $(ROOT_DIR)/mic-auth

setup:
	make mongo-pull
	make mongo-run
	make redis-pull
	make redis-run
	cd MIC_USER_DIR && yarn install --force
	cd MIC_AUTH_DIR && yarn install --force

dev:
	osascript -e 'tell application "Terminal" to do script "cd $(MIC_USER_DIR) && yarn start:dev"'
	osascript -e 'tell application "Terminal" to do script "cd $(MIC_AUTH_DIR) && yarn start:dev"'