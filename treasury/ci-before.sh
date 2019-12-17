#!/bin/sh
echo "Running ci-before.sh script..."

# replace config templates
node ci-replace.js

echo "creating dummy imprint template..."
touch src/app/imprint/imprint.component.html

echo "creating .firebaserc..."
echo "{\"projects\":{\"ci\":\"$FIREBASE_PROJECT_ID\"}}" > .firebaserc

echo "installing packages..."
npm i

echo "running build for ci stage..."
npm run build:ci

echo "grabbing JWT token..."
npm run cy:prepareci
