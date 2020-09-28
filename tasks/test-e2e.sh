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
npx create-node-ms --verbose  --projectName test-service -e test --noCommit
cd test-service && yarn build

# Done!
sh -c "echo '🦄  Everything is working!'"
sh -c "echo '🚀  Ready to ship'"