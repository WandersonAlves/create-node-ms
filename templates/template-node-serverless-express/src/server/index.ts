import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { eventContext } from 'aws-serverless-express/middleware';
import { logger } from '../shared/Logger';
import ExpressRouteNotFoundAdapter from '../shared/adapters/ExpressRouteNotFoundAdapter';
import RandomNumberRoute from '../modules/RandomNumber/RandomNumberRoute';

const server = express();

server.use(eventContext());
server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.use('/random-number', RandomNumberRoute);

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;
