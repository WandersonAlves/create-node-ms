import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: D_Entity_DCase :: PUT /D_entity_D/:id', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when editing a D_entity_D', done => {
    request.put('/D_entity_D/1').send({}).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, {}, done);
  });
});
