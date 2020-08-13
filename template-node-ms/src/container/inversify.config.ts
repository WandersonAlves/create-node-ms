import { Container } from 'inversify';
import { DataRepository, DatabaseConnection } from '../shared/interfaces';
import DeleteD_Entity_DRouter from '../presentation/routers/DeleteD_Entity_DRouter';
import D_Entity_DCase from '../cases/D_Entity_DCase';
import D_Entity_DPostgresRepository from '../repositories/D_Entity_DPostgresRepository';
import GetD_Entities_DRouter from '../presentation/routers/GetD_Entities_DRouter';
import GetD_Entity_DRouter from '../presentation/routers/GetD_Entity_DRouter';
import InjectionReferences from './inversify.references';
import PostD_Entity_DRouter from '../presentation/routers/PostD_Entity_DRouter';
import PostgresConnection from '../infra/db/postgres/PostgresConnection';
import PutD_Entity_DRouter from '../presentation/routers/PutD_Entity_DRouter';

const container = new Container({ defaultScope: 'Singleton' });

// D_Entity_D
container.bind<DataRepository>(InjectionReferences.D_Entity_DRepositoryRef).to(D_Entity_DPostgresRepository);

// Infra
container.bind<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).to(PostgresConnection);

// Domain / Use Cases
container.bind<D_Entity_DCase>(InjectionReferences.D_Entity_DCaseRef).to(D_Entity_DCase);

// Routers
container.bind<GetD_Entity_DRouter>(InjectionReferences.GetD_Entity_DRouterRef).to(GetD_Entity_DRouter);
container.bind<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef).to(GetD_Entities_DRouter);
container.bind<PostD_Entity_DRouter>(InjectionReferences.PostD_Entity_DRouterRef).to(PostD_Entity_DRouter);
container.bind<PutD_Entity_DRouter>(InjectionReferences.PutD_Entity_DRouterRef).to(PutD_Entity_DRouter);
container.bind<DeleteD_Entity_DRouter>(InjectionReferences.DeleteD_Entity_DRouterRef).to(DeleteD_Entity_DRouter);

export default container;
