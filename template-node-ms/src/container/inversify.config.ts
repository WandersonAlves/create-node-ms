import { Container } from 'inversify';
import { DataRepository, DatabaseConnection } from '../shared/interfaces';
import DeleteEntityRouter from '../presentation/routers/DeleteEntityRouter';
import EntityCase from '../cases/EntityCase';
import EntityPostgresRepository from '../repositories/EntityPostgresRepository';
import GetEntitiesRouter from '../presentation/routers/GetEntitiesRouter';
import GetEntityRouter from '../presentation/routers/GetEntityRouter';
import InjectionReferences from './inversify.references';
import PostEntityRouter from '../presentation/routers/PostEntityRouter';
import PostgresConnection from '../infra/db/postgres/PostgresConnection';
import PutEntityRouter from '../presentation/routers/PutEntityRouter';

const container = new Container({ defaultScope: 'Singleton' });

// Entity
container.bind<DataRepository>(InjectionReferences.EntityRepositoryRef).to(EntityPostgresRepository);

// Infra
container.bind<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).to(PostgresConnection);

// Domain / Use Cases
container.bind<EntityCase>(InjectionReferences.EntityCaseRef).to(EntityCase);

// Routers
container.bind<GetEntityRouter>(InjectionReferences.GetEntityRouterRef).to(GetEntityRouter);
container.bind<GetEntitiesRouter>(InjectionReferences.GetEntitiesRouterRef).to(GetEntitiesRouter);
container.bind<PostEntityRouter>(InjectionReferences.PostEntityRouterRef).to(PostEntityRouter);
container.bind<PutEntityRouter>(InjectionReferences.PutEntityRouterRef).to(PutEntityRouter);
container.bind<DeleteEntityRouter>(InjectionReferences.DeleteEntityRouterRef).to(DeleteEntityRouter);

export default container;
