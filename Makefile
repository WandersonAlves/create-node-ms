dev:
				yarn dev
e2e:
				yarn test:e2e
code-nse:
				yarn dev:nse && code ../create-node-ms-junk/serverless-express
code-nsl:
				yarn dev:nsl && code ../create-node-ms-junk/serverless-lambda
code-express:
				yarn dev:express && code ../create-node-ms-junk/express-server