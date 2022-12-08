#!/bin/sh

# Config
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
echo "registry=http://localhost:4873/
//localhost:4873/:_authToken=fake" > ~/.npmrc
yarn config set registry http://localhost:4873
yarn publish

# Finally run a e2e test
sh -c "echo '🏃🏾‍♂️ serverless-lambda --useNpm'"
yarn create node-ms serverless-lambda sls-lambda-npm --noCommit --useNpm
cd sls-lambda-npm && yarn test && yarn lint && LAMBDA=RandomNumber yarn build
sh -c "echo '✅ serverless-lambda --useNpm e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ serverless-express'"
yarn create node-ms serverless-express sls-express --noCommit
cd sls-express && yarn test && yarn lint && yarn build
sh -c "echo '✅ serverless-express e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ serverless-lambda'"
yarn create node-ms serverless-lambda sls-lambda --noCommit
cd sls-lambda && yarn test && yarn lint && LAMBDA=RandomNumber yarn build
sh -c "echo '✅ serverless-lambda e2e done'"

cd ..

sh -c "echo '🏃🏾‍♂️ express'"
yarn create node-ms express express-server --noCommit
cd express-server && yarn test && yarn lint && yarn build
sh -c "echo '✅ express e2e done'"

cd ..

# Done!
sh -c "echo '🦄  Everything is working!'"
sh -c "echo '🚀  Ready to ship'"