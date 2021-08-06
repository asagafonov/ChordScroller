install:
	npm install

start:
	npm start

build:
	npm run build

lint:
	npx eslint .

test:
	NODE_ENV=test npm test

.PHONY: test
