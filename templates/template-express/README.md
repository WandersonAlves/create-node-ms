# express-server

This will be a awesome server one day!

## Everyday commands

- `test`: Run your unit tests with `chai` and `mocha`
- `test:coverage`: Generates a coverage report using `nyc`
- `lint`: Run eslint
- `lint:fix`: Run eslint and fix all fixable errors
- `dev`: Uses `nodemon` to start and restart your development
- `build`: Creates a bundle of your server using `webpack` and `typescript`
- `prettier:fix`: Run prettier

## Project Structure

- `src/infra`: Contains infrastructure files: env variables, depedency injection container and a http handler
- `src/test-utils`: Files used while testing
  - `./TestContainer.ts`: Creates a minimal inversify container that you can inject your file (and everything that that file will need to be injected)
  - `./ReturnHelper.ts`: Collection of helpers
- `src/server`: Server file
- `src/shared`:Ffiles used in all places on the boilerplate
  - `./adapters`: Adapters files that handle expecific things of a external lib (i.e: express)
  - `./contracts`: Self explanatory
  - `./decorators`: Used on `Case` layer. Abstracts a error response
  - `./exceptions`: Exceptions folder. All Exceptions inherits from `GenericException`
  - `./responses`: Wrap an result from `Cases` in a nice JSON object
  - `./server`: Middlewares for your server
  - `./types`: Self explanatory
  - `./Logger.ts`: A custom logger made with `winston`
- `src/modules`: here your business lives!
  - `v1/`: v1 version modules
    - `Routes.ts`: Routes for all modules
    - `RandomNumber/`: A module named `RandomNumber`
      - `RandomNumber/GenerateRandomNumber/`: A piece of business inside `RandomNumber`
        - `RandomNumber/GenerateRandomNumber/GenerateRandomNumberCase`: A `case` file for `RandomNumber` module. `Case`s are the main piece of business on the project
        - `RandomNumber/GenerateRandomNumber/GenerateRandomNumberRouter`: A `router` file for `RandomNumber` module. `Router`s are where you transform and validate the data that came from a request before sending to a `Case` class
      - `RandomNumber/RandomNumberRoutes.ts`: Exports the routes for `RandomNumber` module

### Application flow

1. A server on presentation layer asks for a `RequestRouter` (i.e GetBillsRouter). These `RequestRouter`s need a param of type `IHttpRequest`
   1. Using adapter pattern, we translate our `RequestRouter` to something our chosen server can read and the original request to a `IHttpRequest` type
2. Our `RequestRouter` asks for a `UseCase`, and runs a `execute` method on it.
3. `UseCase` now do whatever is need to `execute` a use case. Maybe you need a `DataRepository` to access infra layer?
