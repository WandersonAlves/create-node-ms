import 'reflect-metadata';
import * as jwt from 'jsonwebtoken';
import { expect } from 'chai';
import { IAuthorizationDTO } from '../entities/dtos/IAuthorizationDTO';
import { IHttpResponse, IHttpError } from '../presentation/interfaces';
import { logger } from '../shared/Logger';
import { UNAUTHORIZED, OK } from 'http-status';
import AuthenticationCase from './AuthenticationCase';
import AuthException from '../shared/exceptions/AuthException';
import container from '../container/inversify.config';
import InjectionReferences from '../container/inversify.references';
import UserInMemoryRepository from '../entities/repositories/UserInMemoryRepository';

const _bindUserRepoMock = () => {
  container.unbind(InjectionReferences.UserRepositoryRef);
  container.bind(InjectionReferences.UserRepositoryRef).to(UserInMemoryRepository);
};

const _getUseCase = () => {
  return container.get<AuthenticationCase>(InjectionReferences.AuthenticationCaseRef);
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

  it("Should not authenticate a user if email don't exists", async () => {
    _bindUserRepoMock();
    const result = (await _getUseCase().authenticateUser({ email: 'admina@admin.com', password: '1234' })) as IHttpResponse<
      IHttpError
    >;
    expect(result.statusCode).equal(UNAUTHORIZED);
    expect(result.body.message).equals(AuthException.messageValues[AuthException.LoginDontExists]);
    expect(result.success).equal(false);
  });

  it('Should not authenticate a user if email exists but password is wrong', async () => {
    _bindUserRepoMock();
    const result = (await _getUseCase().authenticateUser({ email: 'foo@bar.com', password: '12345' })) as IHttpResponse<
      IHttpError
    >;
    expect(result.statusCode).equal(UNAUTHORIZED);
    expect(result.body.message).equals(AuthException.messageValues[AuthException.LoginPasswordNotAllowed]);
    expect(result.success).equal(false);
  });

  it('Should authenticate a user', async () => {
    _bindUserRepoMock();
    const result = (await _getUseCase().authenticateUser({ email: 'foo@bar.com', password: '1234' })) as IHttpResponse<
      IAuthorizationDTO
    >;
    expect(result.statusCode).equal(OK);
    expect(result.success).equal(true);
    expect(() => jwt.verify(result.body.token, 'random-secret')).to.not.throw();
  });
});
