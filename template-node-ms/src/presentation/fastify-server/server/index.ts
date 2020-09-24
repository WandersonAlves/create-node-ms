import { fastify } from 'fastify';
import container from '../../../infra/container/inversify.config';
import FastifyRouteNotFoundAdapter from '../adapter/RouteNotFoundAdapter';
import FastifyRouterAdapter from '../adapter/FastifyRouterAdapter';
import GetD_Entities_DRouter from '../../routers/GetD_Entities_DRouter';
import InjectionReferences from '../../../infra/container/inversify.references';

const server = fastify({ logger: true });

const getD_Entities_DRouter = container.get<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef);

server.get('/D_entity_D', FastifyRouterAdapter.adapt(getD_Entities_DRouter));

server.setNotFoundHandler(FastifyRouteNotFoundAdapter.adapt());

export default server;