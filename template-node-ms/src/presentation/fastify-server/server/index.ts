import * as fastify from 'fastify';
import container from '../../../container/inversify.config';
import DeleteD_Entity_DRouter from '../../routers/DeleteD_Entity_DRouter';
import FastifyRouteNotFoundAdapter from '../adapter/RouteNotFoundAdapter';
import FastifyRouterAdapter from '../adapter/FastifyRouterAdapter';
import GetD_Entities_DRouter from '../../routers/GetD_Entities_DRouter';
import GetD_Entity_DRouter from '../../routers/GetD_Entity_DRouter';
import InjectionReferences from '../../../container/inversify.references';
import PostD_Entity_DRouter from '../../routers/PostD_Entity_DRouter';
import PutD_Entity_DRouter from '../../routers/PutD_Entity_DRouter';

const server = fastify({ logger: true });

const getD_Entities_DRouter = container.get<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef);
const getD_Entity_DRouter = container.get<GetD_Entity_DRouter>(InjectionReferences.GetD_Entity_DRouterRef);
const postD_Entity_DRouter = container.get<PostD_Entity_DRouter>(InjectionReferences.PostD_Entity_DRouterRef);
const putD_Entity_DRouter = container.get<PutD_Entity_DRouter>(InjectionReferences.PutD_Entity_DRouterRef);
const deleteD_Entity_DRouter = container.get<DeleteD_Entity_DRouter>(InjectionReferences.DeleteD_Entity_DRouterRef);

server.get('/D_entity_D', FastifyRouterAdapter.adapt(getD_Entities_DRouter));

server.setNotFoundHandler(FastifyRouteNotFoundAdapter.adapt());

export default server;