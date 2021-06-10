import * as bodyParser from 'body-parser';
import * as express from 'express';
import { eventContext } from 'aws-serverless-express/middleware';
import ExpressRouteNotFoundAdapter from '../shared/adapters/ExpressRouteNotFoundAdapter';
import V1Routes from '../modules/Routes';

const server = express();

server.use(eventContext());
server.use(bodyParser.json());

server.use('/v1', V1Routes);

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;
