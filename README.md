# clean-node-ms (Under construction)

Create typescript microservices without pain!

## Quick Overview

```
npx create-node-ms -pn test-service -e Test
cd test-service
yarn dev
```

## Options

- `-pn, --projectName`(**required**): Project name
- `-e, --entityName`(**required**): Name of the first entity name
- `-ep, --entityPluralName`: Pluralized name of the entity
- `-p, --path`: Absolute or relative path to create the project
- `--useNpm`: Use npm instead of yarn to install depedencies
- `--noCommit`: Don't do a first commit
- `--verbose`: Output verbose info

## What's inside?

This boilerplate comes in a optionated clean architecture with Typescript, Express/Fastify, TypeORM, inversify and others.

TSLint, prettier and husky are configured. Everything can be changed

## Roadmap

- Better README
- Options for REST ms, queue ms, job ms, etc...
- Mongo/Postgres swap without pain