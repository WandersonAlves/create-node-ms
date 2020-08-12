import * as fastify from 'fastify';
import container from '../../../container/inversify.config';
import DeleteEntityRouter from '../../routers/DeleteEntityRouter';
import FastifyRouteNotFoundAdapter from '../adapter/RouteNotFoundAdapter';
import FastifyRouterAdapter from '../adapter/FastifyRouterAdapter';
import GetEntitiesRouter from '../../routers/GetEntitiesRouter';
import GetEntityRouter from '../../routers/GetEntityRouter';
import InjectionReferences from '../../../container/inversify.references';
import PostEntityRouter from '../../routers/PostEntityRouter';
import PutEntityRouter from '../../routers/PutEntityRouter';

const server = fastify({ logger: true });

const getEntitiesRouter = container.get<GetEntitiesRouter>(InjectionReferences.GetEntitiesRouterRef);
const getEntityRouter = container.get<GetEntityRouter>(InjectionReferences.GetEntityRouterRef);
const postEntityRouter = container.get<PostEntityRouter>(InjectionReferences.PostEntityRouterRef);
const putEntityRouter = container.get<PutEntityRouter>(InjectionReferences.PutEntityRouterRef);
const deleteEntityRouter = container.get<DeleteEntityRouter>(InjectionReferences.DeleteEntityRouterRef);

server.get('/entity', FastifyRouterAdapter.adapt(getEntitiesRouter));

server.setNotFoundHandler(FastifyRouteNotFoundAdapter.adapt());

export default server;