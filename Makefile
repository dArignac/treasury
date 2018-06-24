# in local stage the travis build dir is not set, so set it to the current dir
ifeq ($(TRAVIS_BUILD_DIR),)
	export TRAVIS_BUILD_DIR=`pwd`
endif

documentation:
	@echo "Creating asciidoc documentation..."
	docker run --rm -v $(TRAVIS_BUILD_DIR):/documents/ --name asciidoc-to-html darignac/asciidoctor asciidoctor -r asciidoctor-diagram documents/index.adoc
	@echo "Done. Now open documents/index.html."