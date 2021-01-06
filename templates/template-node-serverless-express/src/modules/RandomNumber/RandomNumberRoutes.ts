import { GetFromContainer } from '../../utils';
import { Router } from 'express';
import ExpressRouterAdapter from '../../shared/adapters/ExpressRouterAdapter';
import GenerateRandomNumberRouter from './GenerateRandomNumber/GenerateRandomNumberRouter';

const RandomNumberRoute = Router();

RandomNumberRoute.get('/', ExpressRouterAdapter.adapt(GetFromContainer(GenerateRandomNumberRouter)));

export default RandomNumberRoute;
