# clean-node-ms (Under construction)

A optionated group of boilerplates to help you build nice micro-services :bowtie:

Currently has only a node template (`template-node-ms`), but in the future we'll have:

- template-go-ms
- template-go-queue-consumer
- template-go-queue-producer
- template-node-cron

## Quick Overview

```
npx create-node-ms -pn test-service -e Test
cd test-service
yarn dev
```

## Options

- `-pn, --projectName`(**required**): Project name
- `-e, --entityName`(**required**): Name of first entity
- `-ep, --entityPluralName`: Pluralized name of the entity
- `-p, --path`: Absolute or relative path to create the project
- `--useNpm`: Use npm instead of yarn to install depedencies
- `--noCommit`: Don't do a first commit
- `--verbose`: Output verbose info

## Templates Details

### `template-node-ms`

- Rest server: express | fastify
- IoC|DI: InversifyJS
- Database: postgres
- Testing: mocha + chai
- Build: webpack + https://github.com/astefanutti/scratch-node

> To build the final version of your service, run `yarn build`, `yarn build:webpack` and `yarn build:docker`

## Roadmap

- Better README
- Options for REST ms, queue ms, job ms, etc...
- Mongo/Postgres swap without pain

## Contributing

- Clone this repo
- Run `yarn build` to generate new lib files when you alter things
- Test your repo running `node clean-node-ms/lib/index.js -pn <project-name> -e <entity-name> --verbose`
- Commit your changes (this project has `commitlint` configured)
- Send a PR :rocket:
