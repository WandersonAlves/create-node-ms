import 'reflect-metadata';
import { expect } from 'chai';
import { OK } from 'http-status';
import container from '../../src/container/inversify.config';
import D_Entity_DCase from '../../src/cases/D_Entity_DCase';
import D_Entity_DInMemoryRepository from '../../src/repositories/D_Entity_DInMemoryRepository';
import InjectionReferences from '../../src/container/inversify.references';

const _bindD_Entity_DRepoMock = () => {
  container.unbind(InjectionReferences.D_Entity_DRepositoryRef);
  container.bind(InjectionReferences.D_Entity_DRepositoryRef).to(D_Entity_DInMemoryRepository);
};

const _getUseCase = () => {
  return container.get<D_Entity_DCase>(InjectionReferences.D_Entity_DCaseRef);
};

describe('Authentication Use Case', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });

  afterEach(() => {
    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    container.restore();
  });

  it("Should get D_entities_D", async () => {
    _bindD_Entity_DRepoMock();
    const result = await _getUseCase().getD_Entities_D();
    expect(result.statusCode).equal(OK);
  });
});
