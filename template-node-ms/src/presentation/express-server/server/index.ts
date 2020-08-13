import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { logger } from '../../../shared/Logger';
import container from '../../../container/inversify.config';
import DeleteD_Entity_DRouter from '../../routers/DeleteD_Entity_DRouter';
import ExpressRouteNotFoundAdapter from '../adapter/RouteNotFoundAdapter';
import ExpressRouterAdapter from '../adapter/ExpressRouterAdapter';
import GetD_Entities_DRouter from '../../routers/GetD_Entities_DRouter';
import GetD_Entity_DRouter from '../../routers/GetD_Entity_DRouter';
import InjectionReferences from '../../../container/inversify.references';
import PostD_Entity_DRouter from '../../routers/PostD_Entity_DRouter';
import PutD_Entity_DRouter from '../../routers/PutD_Entity_DRouter';

const server = express();
const getD_Entities_DRouter = container.get<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef);
const getD_Entity_DRouter = container.get<GetD_Entity_DRouter>(InjectionReferences.GetD_Entity_DRouterRef);
const postD_Entity_DRouter = container.get<PostD_Entity_DRouter>(InjectionReferences.PostD_Entity_DRouterRef);
const putD_Entity_DRouter = container.get<PutD_Entity_DRouter>(InjectionReferences.PutD_Entity_DRouterRef);
const deleteD_Entity_DRouter = container.get<DeleteD_Entity_DRouter>(InjectionReferences.DeleteD_Entity_DRouterRef);

server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.get('/D_entity_D', ExpressRouterAdapter.adapt(getD_Entities_DRouter));
server.get('/D_entity_D/:id', ExpressRouterAdapter.adapt(getD_Entity_DRouter));
server.post('/D_entity_D', ExpressRouterAdapter.adapt(postD_Entity_DRouter));
server.put('/D_entity_D/:id', ExpressRouterAdapter.adapt(putD_Entity_DRouter));
server.delete('/D_entity_D/:id', ExpressRouterAdapter.adapt(deleteD_Entity_DRouter));

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;