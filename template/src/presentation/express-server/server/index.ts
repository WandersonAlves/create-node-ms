import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { logger } from '../../../shared/Logger';
import { RouteNotFoundMiddleware } from '../utils';
import container from '../../../container/inversify.config';
import DeleteEntityRouter from '../routers/DeleteEntityRouter';
import ExpressRouterAdapter from '../adapter/ExpressHttpRouterAdapter';
import GetEntitiesRouter from '../routers/GetEntitiesRouter';
import GetEntityRouter from '../routers/GetEntityRouter';
import InjectionReferences from '../../../container/inversify.references';
import PostEntityRouter from '../routers/PostEntityRouter';
import PutEntityRouter from '../routers/PutEntityRouter';

const server = express();
const getEntitiesRouter = container.get<GetEntitiesRouter>(InjectionReferences.GetEntitiesRouterRef);
const getEntityRouter = container.get<GetEntityRouter>(InjectionReferences.GetEntityRouterRef);
const postEntityRouter = container.get<PostEntityRouter>(InjectionReferences.PostEntityRouterRef);
const putEntityRouter = container.get<PutEntityRouter>(InjectionReferences.PutEntityRouterRef);
const deleteEntityRouter = container.get<DeleteEntityRouter>(InjectionReferences.DeleteEntityRouterRef);

server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.get('/entity', ExpressRouterAdapter.adapt(getEntitiesRouter));
server.get('/entity/:id', ExpressRouterAdapter.adapt(getEntityRouter));
server.post('/entity', ExpressRouterAdapter.adapt(postEntityRouter));
server.put('/entity/:id', ExpressRouterAdapter.adapt(putEntityRouter));
server.delete('/entity/:id', ExpressRouterAdapter.adapt(deleteEntityRouter));

server.use(RouteNotFoundMiddleware);

export default server;