import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: EntityCase :: GET /entity/:id', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when fetch a entity', (done) => {
    request.get('/entity/1').expect(200, done);
  });
});
