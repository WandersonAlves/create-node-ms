import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import { CheckJWTokenMiddleware, RouteNotFoundMiddleware } from '../utils';
import { logger } from '../../../shared/Logger';
import AuthenticateUserRouter from '../routers/AuthenticateUserRouter';
import container from '../../../container/inversify.config';
import CreatePlaceRouter from '../routers/CreatePlaceRouter';
import CreateUserRouter from '../routers/CrateUserRouter';
import EvaluatePlaceRouter from '../routers/EvaluatePlaceRouter';
import ExpressRouterAdapter from '../adapter/ExpressHttpRouterAdapter';
import GetPlacesRouter from '../routers/GetPlacesRouter';
import GetPlacesWithCommentsRouter from '../routers/GetPlaceWithCommentRouter';
import GetUserProfileRouter from '../routers/GetUserProfileRouter';
import InjectionReferences from '../../../container/inversify.references';
import LogoutUserRouter from '../routers/LogoutUserRouter';
import UpdateUserProfileRouter from '../routers/UpdateUserProfileRouter';

const server = express();
const createUserRouter = container.get<CreateUserRouter>(InjectionReferences.CreateUserRouterRef);
const authUserRouter = container.get<AuthenticateUserRouter>(InjectionReferences.AuthenticateUserRouterRef);
const logoutUserRouter = container.get<LogoutUserRouter>(InjectionReferences.LogoutUserRouterRef);
const evaluatePlaceRouter = container.get<EvaluatePlaceRouter>(InjectionReferences.EvaluatePlaceRouterRef);
const createPlaceRouter = container.get<CreatePlaceRouter>(InjectionReferences.CreatePlaceRouterRef);
const getPlacesRouter = container.get<GetPlacesRouter>(InjectionReferences.GetPlacesRouterRef);
const getUserProfileRouter = container.get<GetUserProfileRouter>(InjectionReferences.GetUserProfileRouterRef);
const updateUserProfileRouter = container.get<UpdateUserProfileRouter>(InjectionReferences.UpdateUserProfileRouterRef);
const getPlaceWithCommentsRouter = container.get<GetPlacesWithCommentsRouter>(InjectionReferences.GetPlacesWithCommentsRouterRef);

server.use(expressWinston.logger(logger));
server.use(bodyParser.json());

server.post('/v1/login', ExpressRouterAdapter.adapt(authUserRouter));
server.post('/v1/register', ExpressRouterAdapter.adapt(createUserRouter));
server.post('/v1/logout', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(logoutUserRouter));

server.get('/v1/profile', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(getUserProfileRouter));
server.put('/v1/profile', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(updateUserProfileRouter));

server.get('/v1/places', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(getPlacesRouter));
server.post('/v1/place', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(createPlaceRouter));
server.get('/v1/place/:place_id', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(getPlaceWithCommentsRouter));
server.post('/v1/place/:place_id/evaluate', CheckJWTokenMiddleware, ExpressRouterAdapter.adapt(evaluatePlaceRouter));

server.use(RouteNotFoundMiddleware);

export default server;