import 'reflect-metadata';
import { expect } from 'chai';
import GenerateRandomNumberCase from '@modules/v1/RandomNumber/GenerateRandomNumber/GenerateRandomNumberCase';
import TestContainer from '@mocks/TestContainer';
import container from '@infra/container/inversify.config';

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
    const result = await new TestContainer(GenerateRandomNumberCase).get().execute({});
    expect(result.body.number).to.be.within(1, 10);
  });
});
