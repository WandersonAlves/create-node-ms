import 'reflect-metadata';
import { expect } from 'chai';
import GenerateRandomNumberCase from '../../src/modules/RandomNumber/GenerateRandomNumber/GenerateRandomNumberCase';
import HttpResponse from '../../src/shared/responses/HttpResponse';
import container from '../../src/infra/container/inversify.config';

const _bindHublogRepoMock = () => null;

const _getUseCase = () => {
  return container.get<GenerateRandomNumberCase>(GenerateRandomNumberCase);
};

describe('GenerateRandomNumberCase', () => {
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

  it('Should get a random number between 1 and 10', async () => {
    _bindHublogRepoMock();
    const result = (await _getUseCase().execute()) as HttpResponse<{ number: number }>;
    expect(result.body.number).to.be.within(1, 10);
  });
});
