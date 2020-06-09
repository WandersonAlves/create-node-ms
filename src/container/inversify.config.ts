import { Container } from 'inversify';
import { DatabaseConnection } from '../infra/interfaces';
import { DataRepository } from '../entities/interfaces';
import AuthenticateUserRouter from '../presentation/express-server/routers/AuthenticateUserRouter';
import AuthenticationCase from '../useCases/AuthenticationCase';
import CreatePlaceRouter from '../presentation/express-server/routers/CreatePlaceRouter';
import CreateUserRouter from '../presentation/express-server/routers/CrateUserRouter';
import EvaluatePlaceRouter from '../presentation/express-server/routers/EvaluatePlaceRouter';
import GetPlacesRouter from '../presentation/express-server/routers/GetPlacesRouter';
import GetPlacesWithCommentsRouter from '../presentation/express-server/routers/GetPlaceWithCommentRouter';
import GetUserProfileRouter from '../presentation/express-server/routers/GetUserProfileRouter';
import InjectionReferences from './inversify.references';
import LogoutUserRouter from '../presentation/express-server/routers/LogoutUserRouter';
import PlaceEvaluationPostgresRepository from '../entities/repositories/PlaceEvaluationPostgresRepository';
import PlacePostgresRepository from '../entities/repositories/PlacePostgresRepository';
import PlacesCase from '../useCases/PlacesCase';
import PostgresConnection from '../infra/db/postgres/PostgresConnection';
import ProfileCase from '../useCases/ProfileCase';
import UpdateUserProfileRouter from '../presentation/express-server/routers/UpdateUserProfileRouter';
import UserPostgresRepository from '../entities/repositories/UserPostgresRepository';

const container = new Container({ defaultScope: 'Singleton' });

// Entity
container.bind<DataRepository>(InjectionReferences.UserRepositoryRef).to(UserPostgresRepository);
container.bind<DataRepository>(InjectionReferences.PlaceRepositoryRef).to(PlacePostgresRepository);
container.bind<DataRepository>(InjectionReferences.PlaceEvaluationRepositoryRef).to(PlaceEvaluationPostgresRepository);

// Infra
container.bind<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).to(PostgresConnection);

// Domain / Use Cases
container.bind<AuthenticationCase>(InjectionReferences.AuthenticationCaseRef).to(AuthenticationCase);
container.bind<PlacesCase>(InjectionReferences.PlacesCaseRef).to(PlacesCase);
container.bind<ProfileCase>(InjectionReferences.ProfileCaseRef).to(ProfileCase);

// Routers
container.bind<CreateUserRouter>(InjectionReferences.CreateUserRouterRef).to(CreateUserRouter);
container.bind<AuthenticateUserRouter>(InjectionReferences.AuthenticateUserRouterRef).to(AuthenticateUserRouter);
container.bind<LogoutUserRouter>(InjectionReferences.LogoutUserRouterRef).to(LogoutUserRouter);
container.bind<EvaluatePlaceRouter>(InjectionReferences.EvaluatePlaceRouterRef).to(EvaluatePlaceRouter);
container.bind<CreatePlaceRouter>(InjectionReferences.CreatePlaceRouterRef).to(CreatePlaceRouter);
container.bind<GetPlacesRouter>(InjectionReferences.GetPlacesRouterRef).to(GetPlacesRouter);
container.bind<GetPlacesWithCommentsRouter>(InjectionReferences.GetPlacesWithCommentsRouterRef).to(GetPlacesWithCommentsRouter);
container.bind<GetUserProfileRouter>(InjectionReferences.GetUserProfileRouterRef).to(GetUserProfileRouter);
container.bind<UpdateUserProfileRouter>(InjectionReferences.UpdateUserProfileRouterRef).to(UpdateUserProfileRouter);

export default container;
