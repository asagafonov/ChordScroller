install:
	npm install

start:
	npm start

build:
	npm run build

lint:
	npm run eslint -- src

test:
	NODE_ENV=test npm test

.PHONY: test
