#!/bin/sh
echo "Running ci-after.sh script..."
# FIXME stop integration angular

echo "removing ${TRAVIS_BUILD_DIR}/treasury/src/environments/environment.ci.ts..."
rm -f ${TRAVIS_BUILD_DIR}/treasury/src/environments/environment.ci.ts

echo "removing ${TRAVIS_BUILD_DIR}/treasury/cypress.env.json..."
rm -f ${TRAVIS_BUILD_DIR}/treasury/cypress.env.json

echo "removing ${TRAVIS_BUILD_DIR}/treasury/serviceAccount.json..."
rm -f ${TRAVIS_BUILD_DIR}/treasury/serviceAccount.json

echo "removing ${TRAVIS_BUILD_DIR}/.firebaserc..."
rm -f ${TRAVIS_BUILD_DIR}/.firebaserc

echo "removing ${TRAVIS_BUILD_DIR}/dist..."
rm -rf ${TRAVIS_BUILD_DIR}/dist
