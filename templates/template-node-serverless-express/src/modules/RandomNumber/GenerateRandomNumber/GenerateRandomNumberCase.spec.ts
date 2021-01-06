import 'reflect-metadata';
import { GetFromContainer } from '../../../utils';
import { expect } from 'chai';
import GenerateRandomNumberCase from './GenerateRandomNumberCase';
import HttpResponse from '../../../shared/responses/HttpResponse';
import container from '../../../infra/container/inversify.config';

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
    const result = (await GetFromContainer(GenerateRandomNumberCase).execute()) as HttpResponse<{ number: number }>;
    expect(result.body.number).to.be.within(1, 10);
  });
});
