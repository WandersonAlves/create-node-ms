# clean-node-ms

A optionated group of templates to help you build nice micro-services :bowtie:

Currently has three templates:

- express
- serverless-express
- serverless-lambda

## Quick Overview

Interactive mode

```
npx create-node-ms create
```

Non-Interactive mode

```
npx create-node-ms <template-name> <projectName> [options]
cd test-service
yarn dev
```

## Global Options (Non-Interactive mode)

- `-d, --addDeps`: Add extra depedencies that are not installed by default
- `-D, --addDevDeps`: Add dev extra depedencies that are not installed by default
- `-p, --path`: Absolute or relative path to create the project
- `--noCommit`: Don't do a first commit. If you has git, but not configured a name/email, git will fail to commit.
- `--verbose`: Output verbose info
- `--useNpm`: Use npm instead of yarn to install depedencies

## Templates

### express

Generates a project with ExpressJS and Typescript

> `npx create-node-ms express express-server`

Includes:

- ExpressJS + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

### serverless-express

Generates a project with ExpressJS and Typescript running locally with [`serverless-offline`](https://www.serverless.com/plugins/serverless-offline)

> `npx create-node-ms serverless-express sls-express`

Includes:

- Serverless Framework + `serverless-offline` + `aws-serverless-express` + ExpressJS + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

### serverless-lambda

Generates a project with Typescript running locally with [`serverless-offline`](https://www.serverless.com/plugins/serverless-offline)

Can store multiple lambdas (instead of one from `serverless-express`) and has support for building a single lambda running `LAMBDA=<lambda-name> yarn build` (see generated project's README.md)

> `npx create-node-ms serverless-lambda sls-lambda`

Includes:

- Serverless Framework + `serverless-offline` + Typescript
- IoC|DI: InversifyJS
- Testing: mocha + chai
- Build: Typescript + Webpack

## Testing

This package uses e2e testing. Check `tasks/test-e2e.sh`. Uses [`verdaccio`](https://github.com/verdaccio/verdaccio) under the hood.

## Contributing

- Fork and clone this repo
- Make changes
- Run `make code-serverless-express` || `make code-serverless-lambda` || `make code-express` to create a new template with your code changes (or `yarn dev create` to run interactive mode)
  - This will clean `../create-node-ms-junk` folder
  - Create a `../create-node-ms-junk/` folder
  - And generate a new project with the name declared on your dev command on `../create-node-ms-junk/` folder
- Commit your changes (this project has `commitlint` configured)
- Send a PR :rocket:
