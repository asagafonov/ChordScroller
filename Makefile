EXTENSION_PACKAGE_NAME="chordscroller.zip"

install:
	npm install

start:
	npm start

build:
	npm run build

clean:
	rm -rf dist
	rm -f $(EXTENSION_PACKAGE_NAME)

zip:
	zip -rj $(EXTENSION_PACKAGE_NAME) dist/*

lint:
	npx eslint ./src

test:
	NODE_ENV=test npm test

.PHONY: test
