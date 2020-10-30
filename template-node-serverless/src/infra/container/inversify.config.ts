import { Container } from 'inversify';
import AxiosHttpHandle from '../http/AxiosHttpHandler';
import GenerateRandomNumberCase from '../../cases/GenerateRandomNumberCase';
import GetRandomNumberRouter from '../../server/routers/GetRandomNumberRouter';

const container = new Container({ defaultScope: 'Singleton' });

// Domain / Use Cases
container.bind<GenerateRandomNumberCase>(GenerateRandomNumberCase).toSelf();

// Routes
container.bind<GetRandomNumberRouter>(GetRandomNumberRouter).toSelf();

// Infra
container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();

export default container;
