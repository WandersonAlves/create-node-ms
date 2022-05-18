#!/bin/sh

# Config
localRegistryAddress="http://localhost:4873"
set -e # Set exit on error
set -x # Output to console

# Install verdaccio
npm install -g verdaccio
# See https://www.tecmint.com/run-linux-command-process-in-background-detach-process/
sh -c "verdaccio --config $(pwd)/tasks/verdaccio.yaml </dev/null &>/dev/null &"

# Build project
yarn
yarn build

# Set registry and publish
npm set registry "$localRegistryAddress"
npm publish --tag e2e

# Finally run a e2e test
sh -c "echo '🏃🏾‍♂️ serverless-lambda --useNpm'"
npx create-node-ms serverless-lambda -pn serverless-lambda-npm --noCommit --useNpm
cd serverless-lambda-npm && npm run test && npm run lint && npm run build
sh -c "echo '✅ serverless-lambda --useNpm e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ serverless-express'"
npx create-node-ms nse -pn serverless-express --noCommit
cd serverless-express && yarn test && yarn lint && yarn build
sh -c "echo '✅ serverless-express e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ serverless-lambda'"
npx create-node-ms serverless-lambda -pn serverless-lambda --noCommit
cd serverless-lambda && yarn test && yarn lint && yarn build
sh -c "echo '✅ serverless-lambda e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ express'"
npx create-node-ms express -pn express-server --noCommit
cd express-server && yarn test && yarn lint && yarn build
sh -c "echo '✅ express e2e done'"

cd ..

# Done!
sh -c "echo '🦄  Everything is working!'"
sh -c "echo '🚀  Ready to ship'"