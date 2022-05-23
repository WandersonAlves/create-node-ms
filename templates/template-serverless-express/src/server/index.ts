import * as cors from 'cors';
import * as express from 'express';
import { eventContext } from 'aws-serverless-express/middleware';
import ExpressRouteNotFoundAdapter from '@shared/adapters/ExpressRouteNotFoundAdapter';
import V1Routes from '@modules/v1/Routes';

const server = express();

server.options('*', cors());
server.use(eventContext());
server.use(express.json());

server.use('/v1', V1Routes);

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;
