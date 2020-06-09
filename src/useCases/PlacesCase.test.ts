import { CREATED, OK } from 'http-status';
import { expect } from 'chai';
import { IHttpResponse } from '../presentation/interfaces';
import { IPlaceDTO } from '../entities/dtos/IPlaceDTO';
import container from '../container/inversify.config';
import InjectionReferences from '../container/inversify.references';
import PlaceEvaluationInMemoryRepository from '../entities/repositories/PlaceEvaluationInMemoryRepository';
import PlaceInMemoryRepository from '../entities/repositories/PlaceInMemoryRepository';
import PlacesCase from './PlacesCase';

const _bindPlaceRepoMock = () => {
  container.unbind(InjectionReferences.PlaceRepositoryRef);
  container.bind(InjectionReferences.PlaceRepositoryRef).to(PlaceInMemoryRepository);
};

const _bindPlaceEvalRepoMock = () => {
  container.unbind(InjectionReferences.PlaceEvaluationRepositoryRef);
  container.bind(InjectionReferences.PlaceEvaluationRepositoryRef).to(PlaceEvaluationInMemoryRepository);
}

const _getUseCase = () => {
  return container.get<PlacesCase>(InjectionReferences.PlacesCaseRef);
};

describe('Places Use Case', () => {
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

  it('Should create a new place', async () => {
    _bindPlaceRepoMock();
    const { statusCode, success } = await _getUseCase().createNewPlace({ name: 'Home', lat: -8.1544512, long: -34.9215271 });
    expect(statusCode).equal(CREATED);
    expect(success).equal(true);
  });

  it('Should get the list of places ordered by name', async () => {
    _bindPlaceRepoMock();
    const { statusCode, success, body } = await _getUseCase().getPlaces({});
    expect(statusCode).equal(OK);
    expect(success).equal(true);
    expect(body).length(5);
    expect(body[0].name).equals('Churrascaria Ponto Gaúcho');
  });

  it('Should get the list of places ordered by distance', async () => {
    _bindPlaceRepoMock();
    const { statusCode, success, body } = await _getUseCase().getPlaces({ mode: 'map', lat: -8.1544512, long: -34.9215271 });
    expect(statusCode).equal(OK);
    expect(success).equal(true);
    expect(body).length(5);
    expect(body[0].name).equals('Home');
  });

  it('Should get a place and their comments', async () => {
    _bindPlaceRepoMock();
    const { statusCode, success, body } = (await _getUseCase().getPlace(1)) as IHttpResponse<IPlaceDTO>;
    expect(statusCode).equal(OK);
    expect(success).equal(true);
    expect(body.name).equals('Home');
    expect(body.evaluations).length(3);
  });

  it('Should evaluate a place', async () => {
    _bindPlaceEvalRepoMock();
    const { statusCode, success, body } = await _getUseCase().evaluatePlace(1, 1, { comment: 'test', rating: 5 });
    expect(statusCode).equal(CREATED);
    expect(success).equal(true);
    expect(body).deep.equal({
      comment: 'test',
      rating: 5,
      place_id: 1,
      user_id: 1,
    });
  });
});
