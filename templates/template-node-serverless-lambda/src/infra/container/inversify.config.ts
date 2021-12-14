import { Container } from 'inversify';
import AxiosHttpHandle from '@infra/http/AxiosHttpHandler';
import GenerateRandomNumberCase from '@cases/GenerateRandomNumberCase';

const container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });

// Domain / Use Cases
container.bind<GenerateRandomNumberCase>(GenerateRandomNumberCase).toSelf();

// Infra
container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();

export default container;
