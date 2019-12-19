# in local stage the travis build dir is not set, so set it to the current dir
ifeq ($(TRAVIS_BUILD_DIR),)
	export TRAVIS_BUILD_DIR=`pwd`
endif
export PRIVACY_FILE=treasury/src/app/privacy-policy/privacy-policy.component.html

documentation:
	@echo "Creating asciidoc documentation..."
	docker run --rm -v $(TRAVIS_BUILD_DIR):/documents/ --name asciidoc-to-html darignac/asciidoctor asciidoctor -r asciidoctor-diagram documents/index.adoc
	@echo "Done. Now open documents/index.html."

deploy:
	@echo "Building Angular application"
	cd treasury && npm run build && cd ..
	@echo "Running Firebase deploy for all parts"
	firebase deploy
