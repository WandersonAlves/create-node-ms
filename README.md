# clean-node-ms

A optionated group of templates to help you build nice micro-services :bowtie:

Currently has three templates:

- express
- serverless-express
- serverless-lambda

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

### express

Generates a project with ExpressJS and Typescript

> `npx create-node-ms express -pn express-server`

Includes:

- ExpressJS + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

### serverless-express

Generates a project with ExpressJS and Typescript running locally with [`serverless-offline`](https://www.serverless.com/plugins/serverless-offline)

> `npx create-node-ms serverless-express -pn serverless-express`

Includes:

- Serverless Framework + `serverless-offline` + `aws-serverless-express` + ExpressJS + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

### serverless-lambda

Generates a project with Typescript running locally with [`serverless-offline`](https://www.serverless.com/plugins/serverless-offline)

Can store multiple lambdas (instead of one from `serverless-express`) and has support for building a single lambda running `LAMBDA=<lambda-name> yarn build` (see generated project's README.md)

> `npx create-node-ms serverless-lambda -pn serverless-lambda`

Includes:

- Serverless Framework + `serverless-offline` + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

## Contributing

- Fork and clone this repo
- Make changes
- Run `make code-serverless-express` || `make code-serverless-lambda` || `make code-express` to create a new template with your code changes
  - This will clean `../create-node-ms-junk` folder
  - Create a `../create-node-ms-junk/` folder
  - And generate a new project with the name declared on your dev command on `../create-node-ms-junk/` folder
- Commit your changes (this project has `commitlint` configured)
- Send a PR :rocket:
