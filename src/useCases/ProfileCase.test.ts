import { expect } from 'chai';
import { OK } from 'http-status';
import container from '../container/inversify.config';
import InjectionReferences from '../container/inversify.references';
import ProfileCase from './ProfileCase';
import UserInMemoryRepository from '../entities/repositories/UserInMemoryRepository';

const _bindUserRepoMock = () => {
  container.unbind(InjectionReferences.UserRepositoryRef);
  container.bind(InjectionReferences.UserRepositoryRef).to(UserInMemoryRepository);
};

const _getUseCase = () => {
  return container.get<ProfileCase>(InjectionReferences.ProfileCaseRef);
};

describe('Profile Use Case', () => {
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

  it('Should get a profile', async () => {
    _bindUserRepoMock();
    const { statusCode, success, body } = await _getUseCase().getProfile(1);
    expect(statusCode).equal(OK);
    expect(success).equal(true);
    expect(body.name).equal('Wanderson');
  });

  it('Should update a profile name', async () => {
    _bindUserRepoMock();
    const { statusCode, success, body } = await _getUseCase().alterProfile({ id: 2, name: 'Test User' });
    expect(statusCode).equal(OK);
    expect(success).equal(true);
    expect(body.name).equal('Test User');
  });
});
