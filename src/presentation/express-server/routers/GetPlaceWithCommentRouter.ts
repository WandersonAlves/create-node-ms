import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../../../entities/dtos/IPlaceDTO';
import { RequestRouter, IHttpResponse, IHttpError, IHttpRequest } from '../../interfaces';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';

@injectable()
export default class GetPlacesWithCommentsRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route(req: IHttpRequest): Promise<IHttpResponse<IPlaceDTO | IHttpError>> {
    const { place_id } = req.params;
    return this.placeCase.getPlace(place_id);
  }
}
