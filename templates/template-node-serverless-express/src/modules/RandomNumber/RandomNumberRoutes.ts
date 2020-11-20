import { Router } from 'express';
import ExpressRouterAdapter from '../../shared/adapters/ExpressRouterAdapter';
import GenerateRandomNumberRouter from './GenerateRandomNumber/GenerateRandomNumberRouter';
import container from '../../infra/container/inversify.config';

const RandomNumberRoute = Router();
const generateRandomNumberRouter = container.get<GenerateRandomNumberRouter>(GenerateRandomNumberRouter);

RandomNumberRoute.get('/', ExpressRouterAdapter.adapt(generateRandomNumberRouter));

export default RandomNumberRoute;
