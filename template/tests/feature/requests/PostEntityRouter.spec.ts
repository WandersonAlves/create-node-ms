import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: EntityCase :: POST /entity', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 201 when create a new entity', done => {
    request
      .post('/entity')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});
