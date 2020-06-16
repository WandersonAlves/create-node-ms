import 'reflect-metadata';
import { expect } from 'chai';
import { OK } from 'http-status';
import container from '../container/inversify.config';
import EntityCase from './EntityCase';
import EntityInMemoryRepository from '../entities/repositories/EntityInMemoryRepository';
import InjectionReferences from '../container/inversify.references';

const _bindEntityRepoMock = () => {
  container.unbind(InjectionReferences.EntityRepositoryRef);
  container.bind(InjectionReferences.EntityRepositoryRef).to(EntityInMemoryRepository);
};

const _getUseCase = () => {
  return container.get<EntityCase>(InjectionReferences.EntityCaseRef);
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

  it("Should get entities", async () => {
    _bindEntityRepoMock();
    const result = await _getUseCase().getEntities();
    expect(result.statusCode).equal(OK);
  });
});
