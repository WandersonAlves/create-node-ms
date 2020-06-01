import * as bodyParser from 'body-parser';
import * as express from 'express';
import container from '../../container/inversify.config';
import CreatePaymentRouter from '../routers/CreatePaymentRouter';
import ExpressRouterAdapter from '../adapter/ExpressHttpRouterAdapter';
import GetPaymentsRouter from '../routers/GetPaymentsRouter';
import InjectionReferences from '../../container/inversify.references';
import PostPaymentRouter from '../routers/PostPaymentRouter';

const server = express();
const postPaymentRouter = container.get<PostPaymentRouter>(InjectionReferences.PostPaymentRouterRef);
const getPaymentsRouter = container.get<GetPaymentsRouter>(InjectionReferences.GetPaymentsRouterRef);
const createPayment = container.get<CreatePaymentRouter>(InjectionReferences.CreatePaymentRouterRef);

server.use(bodyParser.json());

server.post('/v1/bills/pay/:id', ExpressRouterAdapter.adapt(postPaymentRouter));
server.get('/v1/bills', ExpressRouterAdapter.adapt(getPaymentsRouter));
server.post('/v1/bill', ExpressRouterAdapter.adapt(createPayment));

export default server;