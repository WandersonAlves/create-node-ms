import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { logger } from '../../../shared/Logger';
import container from '../../../infra/container/inversify.config';
import ExpressRouteNotFoundAdapter from '../adapter/RouteNotFoundAdapter';
import ExpressRouterAdapter from '../adapter/ExpressRouterAdapter';
import GetD_Entities_DRouter from '../../routers/GetD_Entities_DRouter';
import InjectionReferences from '../../../infra/container/inversify.references';
import CreateD_Entity_DRouter from '../../routers/CreateD_Entity_DRouter';

const server = express();
const getD_Entities_DRouter = container.get<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef);
const createD_Entity_DRouter = container.get<CreateD_Entity_DRouter>(InjectionReferences.CreateD_Entity_DRouterRef);

server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.get('/D_entity_D', ExpressRouterAdapter.adapt(getD_Entities_DRouter));
server.post('/D_entity_D', ExpressRouterAdapter.adapt(createD_Entity_DRouter));

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;