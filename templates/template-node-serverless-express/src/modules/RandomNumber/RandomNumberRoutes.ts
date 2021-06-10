import { RoutesBuilder } from '../../utils';
import GenerateRandomNumberRouter from './GenerateRandomNumber/GenerateRandomNumberRouter';

const RandomNumberRoutes = new RoutesBuilder().get('/', GenerateRandomNumberRouter).build();

export default RandomNumberRoutes;
