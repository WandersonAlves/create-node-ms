import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/infra/container/inversify.config';

describe('API :: D_Entity_DCase :: POST /D_entity_D', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 201 when create a new D_entity_D', done => {
    request
      .post('/D_entity_D')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});
