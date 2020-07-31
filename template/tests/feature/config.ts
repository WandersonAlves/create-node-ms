import * as supertest from "supertest";
import ExpressServer from '../../src/presentation/express-server/server';

export const request = supertest(ExpressServer);