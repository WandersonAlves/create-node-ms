import { ContainerModule } from 'inversify';
import GenerateRandomNumberCase from './GenerateRandomNumber/GenerateRandomNumberCase';
import GenerateRandomNumberRouter from './GenerateRandomNumber/GenerateRandomNumberRouter';

const RandomNumberContainer = new ContainerModule(bind => {
  bind<GenerateRandomNumberCase>(GenerateRandomNumberCase).toSelf();
  bind<GenerateRandomNumberRouter>(GenerateRandomNumberRouter).toSelf();
});

export default RandomNumberContainer;
