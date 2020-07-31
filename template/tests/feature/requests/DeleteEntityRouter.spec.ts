import 'reflect-metadata';
import { request } from '../config';
import container from '../../../src/container/inversify.config';

describe('API :: EntityCase :: DELETE /entity/:id', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });
  it('Should return 200 when delete a entity', done => {
    request.delete('/entity/1').expect(200, done);
  });
});
