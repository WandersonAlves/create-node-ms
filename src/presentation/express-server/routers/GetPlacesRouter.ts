import { IGetPlacesDTO } from '../../../entities/dtos/IGetPlacesDTO';
import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../../../entities/dtos/IPlaceDTO';
import { RequestRouter, IHttpResponse, IHttpError, IHttpRequest } from '../../interfaces';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';
import UnprocessableEntityException from '../../../shared/exceptions/UnprocessableEntityException';
import Validator from '../../../shared/Validator';

@injectable()
export default class GetPlacesRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route({ query }: IHttpRequest<null, IGetPlacesDTO>): Promise<IHttpResponse<IPlaceDTO[] | IHttpError>> {
    if (query.mode === 'map') {
      const validation = new Validator().isLatLong({ long: query.long, lat: query.lat }, 'latLong');
      if (!validation.hasErrors()) {
        return this.placeCase.getPlaces({ mode: query.mode, long: Number(query.long), lat: Number(query.lat) });
      }
      return Promise.resolve(HttpResponseFactory.error(new UnprocessableEntityException(validation.errors)));
    }
    return this.placeCase.getPlaces({});
  }
}
