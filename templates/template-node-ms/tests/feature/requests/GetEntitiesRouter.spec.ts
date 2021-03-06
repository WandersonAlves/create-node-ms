import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/infra/container/inversify.config';

describe('API :: D_Entity_DCase :: GET /D_entities_D/', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when fetch D_entities_D', (done) => {
    request.get('/D_entity_D').expect(200, done);
  });
});
