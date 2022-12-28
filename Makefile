dev:
				yarn dev
e2e:
				yarn test:e2e
code-serverless-express:
				yarn dev:se && code ../create-node-ms-junk/sls-express
code-serverless-lambda:
				yarn dev:sl && code ../create-node-ms-junk/sls-lambda
code-express:
				yarn dev:express && code ../create-node-ms-junk/express-server