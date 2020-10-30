import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { eventContext } from 'aws-serverless-express/middleware';
import { logger } from '../shared/Logger';
import ExpressRouteNotFoundAdapter from '../shared/adapters/ExpressRouteNotFoundAdapter';
import ExpressRouterAdapter from '../shared/adapters/ExpressRouterAdapter';
import GetRandomNumberRouter from './routers/GetRandomNumberRouter';
import container from '../infra/container/inversify.config';

const server = express();
const getRandomNumberRouter = container.get<GetRandomNumberRouter>(GetRandomNumberRouter);

server.use(eventContext());
server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.get('/random', ExpressRouterAdapter.adapt(getRandomNumberRouter));

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;
