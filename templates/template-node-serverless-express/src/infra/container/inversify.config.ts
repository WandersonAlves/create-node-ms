import { Container } from 'inversify';
import { Newable } from '../../shared/types';
import AxiosHttpHandle from '../http/AxiosHttpHandler';
import RandomNumberContainer from '../../modules/RandomNumber/RandomNumberContainer';

// Merge container modules
const container = new Container({ defaultScope: 'Singleton' });

container.load(RandomNumberContainer);

// Infra
container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();

export default container;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);
