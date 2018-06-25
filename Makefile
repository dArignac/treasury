# in local stage the travis build dir is not set, so set it to the current dir
ifeq ($(TRAVIS_BUILD_DIR),)
	export TRAVIS_BUILD_DIR=`pwd`
endif
export PRIVACY_FILE=treasury/src/app/privacy-policy/privacy-policy.component.html

documentation:
	@echo "Creating asciidoc documentation..."
	docker run --rm -v $(TRAVIS_BUILD_DIR):/documents/ --name asciidoc-to-html darignac/asciidoctor asciidoctor -r asciidoctor-diagram documents/index.adoc
	@echo "Done. Now open documents/index.html."

update-data-privacy:
	@echo "Updating the content of data privacy module with current content of DATA-PRIVACY.md"
	echo "<div class=\"m-4\">" > $(PRIVACY_FILE)
	markdown PRIVACY-POLICY.md >> $(PRIVACY_FILE)
	echo "</div>" >> $(PRIVACY_FILE)