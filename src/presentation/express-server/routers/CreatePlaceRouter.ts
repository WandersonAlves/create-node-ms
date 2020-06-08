
import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../../../entities/dtos/IPlaceDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';

@injectable()
export default class CreatePlaceRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route(req: IHttpRequest<IPlaceDTO>): Promise<IHttpResponse<IPlaceDTO | IHttpError>> {
    return this.placeCase.createNewPlace(req.body);
  }
}
