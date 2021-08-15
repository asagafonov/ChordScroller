EXTENSION_PACKAGE_FILENAME="chordscroller.zip"

install:
	npm install

start:
	npm start

build:
	npm run build

clean_dist:
	rm -rf dist

clean_package:
	rm -f $(EXTENSION_PACKAGE_FILENAME)

clean: clean_dist clean_package

zip_build:
	zip -rj $(EXTENSION_PACKAGE_FILENAME) dist/*

upload_extension_package:
	npx webstore upload \
			--source $(EXTENSION_PACKAGE_FILENAME) \
			--extension-id $(EXTENSION_ID) \
			--client-id $(CLIENT_ID) \
			--client-secret $(CLIENT_SECRET) \
			--refresh-token $(REFRESH_TOKEN)

publish_extension_package:
	npx webstore publish --extension-id $(EXTENSION_ID)

release_extension_package: install clean build zip_build upload_extension_package publish_extension_package

lint:
	npx eslint ./src

test:
	NODE_ENV=test npm test

.PHONY: test
