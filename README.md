# clean-node-ms

A optionated group of templates to help you build nice micro-services (in aws lamda) :bowtie:

Currently has two templates:

- node-serverless-express (nse)
- node-serverless-lambda (nsl)

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
- `--noCommit`: Don't do a first commit. If you has git, but not configured a name/email, git will fail to commit.
- `--verbose`: Output verbose info
- `-d, --addDeps`: Add extra depedencies that are not installed by default
- `-D, --addDevDeps`: Add dev extra depedencies that are not installed by default

## Templates

### node-serverless (`node-serverless-express` | `node-serverless-lambda`)

Comes with two serverless flavors: express (`node-serverless-express` or `nse`) and lambda (`node-serverless-lambda` or `nsl`)

> `npx create-node-ms nse -pn serverless-express`

- Serverless Framework + `serverless-offline` using `aws-serverless-express` or raw lambda file
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

Has configuration for debugging within vscode (see .vscode/launch.json)

## Contributing

- Fork and clone this repo
- Make changes
- Run `yarn dev`, `yarn dev:nse` or `yarn dev:nsl` (or `make code-nse` || `make code-nsl`) to create a new template with your code changes
  - This will remove `../create-node-ms-junk` folder
  - Create a `../create-node-ms-junk/` folder
  - And generate a new project with the name declared on your dev command on `../create-node-ms-junk/` folder
- Commit your changes (this project has `commitlint` configured)
- Send a PR :rocket:
