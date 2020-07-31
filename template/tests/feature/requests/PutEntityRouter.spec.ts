import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: EntityCase :: PUT /entity/:id', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when editing a entity', done => {
    request.put('/entity/1').send({}).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, {}, done);
  });
});
