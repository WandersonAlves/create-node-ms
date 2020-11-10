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
npx create-node-ms nsl -pn serverless-lambda-npm --noCommit --useNpm
cd serverless-lambda-npm && npm run build

sh -c "echo '✅ node-serverless-lambda-npm e2e done'"
cd ..

npx create-node-ms node-ms --verbose  -pn test-service -e test --noCommit
cd test-service && yarn build

sh -c "echo '✅ node-ms e2e done'"
cd ..

npx create-node-ms nse -pn serverless-express --noCommit
cd serverless-express && yarn build

sh -c "echo '✅ node-serverless-express e2e done'"
cd ..

npx create-node-ms nsl -pn serverless-lambda --noCommit
cd serverless-lambda && yarn build

sh -c "echo '✅ node-serverless-lambda e2e done'"
cd ..

# Done!
sh -c "echo '🦄  Everything is working!'"
sh -c "echo '🚀  Ready to ship'"