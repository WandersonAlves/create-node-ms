import { Container } from 'inversify';
import GenerateRandomNumberCase from '../../cases/GenerateRandomNumberCase';

const container = new Container({ defaultScope: 'Singleton' });

// Domain / Use Cases
container.bind<GenerateRandomNumberCase>(GenerateRandomNumberCase).toSelf();

export default container;
