import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { logger } from '../../../shared/Logger';
import container from '../../../container/inversify.config';
import ExpressRouterAdapter from '../adapter/ExpressHttpRouterAdapter';
import GetPaymentRouter from '../routers/GetPaymentRouter';
import GetPaymentsRouter from '../routers/GetPaymentsRouter';
import InjectionReferences from '../../../container/inversify.references';

const server = express();
const getPaymentsRouter = container.get<GetPaymentsRouter>(InjectionReferences.GetPaymentsRouterRef);
const getPaymentRouter = container.get<GetPaymentRouter>(InjectionReferences.GetPaymentRouterRef);

server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.get('/v1/bills', ExpressRouterAdapter.adapt(getPaymentsRouter));
server.get('/v1/bills/:id', ExpressRouterAdapter.adapt(getPaymentRouter));

export default server;