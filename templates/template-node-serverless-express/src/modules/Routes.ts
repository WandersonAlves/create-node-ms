import { Router } from 'express';
import RandomNumberRoutes from './RandomNumber/RandomNumberRoutes';

const V1Routes = Router();

V1Routes.use('/random-number', RandomNumberRoutes);

export default V1Routes;
