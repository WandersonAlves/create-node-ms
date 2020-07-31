import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: EntityCase :: GET /entity', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when fetch entities', done => {
    request.get('/entity').expect(200, done);
  });
});
