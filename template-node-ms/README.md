# D_ProjectName_D

Welcome to your application

## Everyday commands

- `test:unit`: Run your unit tests with chai and mocha
- `test:feature`: Run your feature tests with supertest
- `test:watch`: Watch for file changes and re-run tests
- `lint`: Run tslint
- `lint:fix`: Run tslint and fix all fixable errors
- `dev`: Uses nodemon to start and restart your development
- `build`: Transpile your code to JavaScript in `dist` folder
- `build:webpack`: Bundle in a only one JS file everything on `dist` folder. Outputs to `build`
- `build:docker`: Create a docker image from your `build` folder

## Project Structure

```
  '|-- test-service' (src folder)
  '    |-- index.ts' (Starts database and run server)
  '    |-- cases' (Use cases. Used by presentation/routers)
  '    |   |-- CreateTestCase.ts'
  '    |   |-- GetTestsCase.ts'
  '    |-- config' (Object holding dotenv)
  '    |   |-- env.ts'
  '    |-- container' (Composition root of the project. Uses inversify)
  '    |   |-- inversify.config.ts'
  '    |   |-- inversify.references.ts'
  '    |-- dtos' (Data Transfer Objects)
  '    |   |-- ITestDTO.ts'
  '    |-- infra' (Infra layer. Databases, http/mail clients, etc lives here)
  '    |   |-- db'
  '    |   |   |-- mock'
  '    |   |   |   |-- MockConnection.ts'
  '    |   |   |-- postgres'
  '    |   |       |-- PostgresConnection.ts'
  '    |   |       |-- models'
  '    |   |           |-- TestModel.ts'
  '    |   |-- http'
  '    |       |-- AxiosHttpHandler.ts'
  '    |-- presentation' (Multiple ways to expose your app. Currently has express and fastify configured)
  '    |   |-- express-server'
  '    |   |   |-- adapter' (Adapter a presentation/routers file to a express route)
  '    |   |   |   |-- ExpressRouterAdapter.ts'
  '    |   |   |   |-- RouteNotFoundAdapter.ts'
  '    |   |   |-- server' (Main express server configuration)
  '    |   |   |   |-- index.ts'
  '    |   |   |-- utils'
  '    |   |       |-- index.ts'
  '    |   |-- factory' (Factory to create a HTTP response object)
  '    |   |   |-- HttpResponseFactory.ts'
  '    |   |-- fastify-server'
  '    |   |   |-- adapter' (Adapter a presentation/routers file to a fastify route)
  '    |   |   |   |-- FastifyRouterAdapter.ts'
  '    |   |   |   |-- RouteNotFoundAdapter.ts'
  '    |   |   |-- server' (Main fastify server configuration)
  '    |   |       |-- index.ts'
  '    |   |-- routers' (Routers. Routers executes a UseCase)
  '    |       |-- CreateTestRouter.ts'
  '    |       |-- GetTestsRouter.ts'
  '    |-- repositories' (Classes that know how to access infra objects)
  '    |   |-- TestInMemoryRepository.ts'
  '    |   |-- TestPostgresRepository.ts'
  '    |-- shared' (Shared things like decorators, exceptions, interfaces etc)
  '        |-- Logger.ts'
  '        |-- decorators'
  '        |   |-- ExceptionHandler.ts'
  '        |-- exceptions'
  '        |   |-- AuthException.ts'
  '        |   |-- GenericException.ts'
  '        |   |-- RouteNotFoundException.ts'
  '        |   |-- TestNotFoundException.ts'
  '        |   |-- UnprocessableTestException.ts'
  '        |-- interfaces'
  '        |   |-- index.ts'
  '        |-- server'
  '        |   |-- RouteNotFoundMiddleware.ts'
  '        |-- types'
  '        |   |-- index.ts'
  '        |-- utils'
  '            |-- index.ts'
  ''
```

### Application flow

1. A server on presentation layer asks for a `RequestRouter` (i.e GetBillsRouter). These `RequestRouter`s need a param of type `IHttpRequest`
   1. Using adapter pattern, we translate our `RequestRouter` to something our chosen server can read and the original request to a `IHttpRequest` type
2. Our `RequestRouter` asks for a `UseCase`, and runs a `execute` method on it.
3. `UseCase` now do whatever is need to `execute` a use case. Maybe you need a `DataRepository` to access infra layer?