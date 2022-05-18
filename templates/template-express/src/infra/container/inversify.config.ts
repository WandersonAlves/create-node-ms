import { Container } from 'inversify';
import { Newable } from '@shared/types';
import { buildProviderModule } from 'inversify-binding-decorators';
import AxiosHttpHandle from '@infra/http/AxiosHttpHandler';

// Merge container modules
const container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });

container.load(buildProviderModule());

// Infra
container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();

export default container;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);
