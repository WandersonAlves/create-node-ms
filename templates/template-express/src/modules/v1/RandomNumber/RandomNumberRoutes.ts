import GenerateRandomNumberRouter from '@modules/v1/RandomNumber/GenerateRandomNumber/GenerateRandomNumberRouter';
import RoutesBuilder from '@utils/RoutesBuilder';

const RandomNumberRoutes = new RoutesBuilder().get('/', GenerateRandomNumberRouter).build();

export default RandomNumberRoutes;
