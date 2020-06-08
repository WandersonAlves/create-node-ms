import { IGetPlacesDTO } from '../../../entities/dtos/IGetPlacesDTO';
import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../../../entities/dtos/IPlaceDTO';
import { RequestRouter, IHttpResponse, IHttpError, IHttpRequest } from '../../interfaces';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';

@injectable()
export default class GetPlacesRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route({ query }: IHttpRequest<null, IGetPlacesDTO>): Promise<IHttpResponse<IPlaceDTO[] | IHttpError>> {
    return this.placeCase.getPlaces({ mode: query.mode, long: Number(query.long), lat: Number(query.lat) });
  }
}
