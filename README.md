# clean-node-ms (Under construction)

A optionated group of templates to help you build nice micro-services (and aws lamdas) :bowtie:

Currently has two templates:

- node-ms
- node-serverless-(express | lambda)

Are planned these templates:

- template-go-ms
- template-go-queue-consumer
- template-go-queue-producer
- template-node-cron

## Quick Overview

```
npx create-node-ms <template-name> -pn test-service
cd test-service
yarn dev
```

## Global Options

- `-pn, --projectName`(**required**): Project name
- `-p, --path`: Absolute or relative path to create the project
- `--useNpm`: Use npm instead of yarn to install depedencies
- `--noCommit`: Don't do a first commit
- `--verbose`: Output verbose info

## Templates

### node-ms

> `npx create-node-ms node-ms -pn test-service -e test`

- Rest server: express | fastify
- IoC|DI: InversifyJS
- Database: postgres
- Testing: mocha + chai
- Build: TypeScript + Webpack + https://github.com/astefanutti/scratch-node

> To build the final version of your service, run `yarn build`, `yarn build:webpack` and `yarn build:docker`

#### Options

- `-e, --entityName`(**required**): Name of first entity (name used to create interfaces and etc.)
- `-ep, --entityPluralName`: Pluralized name of the entity

### node-serverless (`node-serverless-express` | `node-serverless-lambda`)

Comes with two serverless flavors: express (`node-serverless-express` or `nse`) and lambda (`node-serverless-lambda` or `nsl`)

> `npx create-node-ms nse -pn serverless-express`

- Serverless Framework + `serverless-offline` using `aws-serverless-express` or raw lambda file
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript

## Roadmap

- Better README
- Options for REST ms, queue ms, job ms, etc...

## Contributing

- Fork and clone this repo
- Make changes
- Run `yarn dev`, `yarn dev:nse` or `yarn dev:nsl` to create a new template with your code changes
  - This will remove `../create-node-ms-junk` folder
  - Create a `../create-node-ms-junk/` folder
  - And generate a new project with the name declared on your dev command on `../create-node-ms-junk/` folder
- Commit your changes (this project has `commitlint` configured)
- Send a PR :rocket:
