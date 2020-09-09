import { Container } from 'inversify';
import { DataRepository, DatabaseConnection } from '../shared/interfaces';
import D_Entity_DPostgresRepository from '../repositories/D_Entity_DPostgresRepository';
import GetD_Entities_DRouter from '../presentation/routers/GetD_Entities_DRouter';
import InjectionReferences from './inversify.references';
import CreateD_Entity_DCase from '../cases/CreateD_Entity_DCase';
import GetD_Entities_DCase from '../cases/GetD_Entities_DCase';
import CreateD_Entity_DRouter from '../presentation/routers/CreateD_Entity_DRouter';
import MockConnection from '../infra/db/mock/MockConnection';

const container = new Container({ defaultScope: 'Singleton' });

// D_Entity_D
container.bind<DataRepository>(InjectionReferences.D_Entity_DRepositoryRef).to(D_Entity_DPostgresRepository);

// Infra
container.bind<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).to(MockConnection);

// Domain / Use Cases
container.bind<CreateD_Entity_DCase>(InjectionReferences.CreateD_Entity_DCaseRef).to(CreateD_Entity_DCase);
container.bind<GetD_Entities_DCase>(InjectionReferences.GetD_Entities_DCaseRef).to(GetD_Entities_DCase);

// Routers
container.bind<GetD_Entities_DRouter>(InjectionReferences.GetD_Entities_DRouterRef).to(GetD_Entities_DRouter);
container.bind<CreateD_Entity_DRouter>(InjectionReferences.CreateD_Entity_DRouterRef).to(CreateD_Entity_DRouter);

export default container;
