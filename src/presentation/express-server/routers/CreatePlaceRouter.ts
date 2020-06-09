import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../../../entities/dtos/IPlaceDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';
import UnprocessableEntityException from '../../../shared/exceptions/UnprocessableEntityException';
import Validator from '../../../shared/Validator';

@injectable()
export default class CreatePlaceRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route(req: IHttpRequest<IPlaceDTO>): Promise<IHttpResponse<IPlaceDTO | IHttpError>> {
    const { name, lat, long } = req.body;
    const validation = new Validator().isLatLong({ long, lat }, 'latLong').exists(name, 'name');
    if (!validation.hasErrors()) {
      return this.placeCase.createNewPlace(req.body);
    }
    return Promise.resolve(HttpResponseFactory.error(new UnprocessableEntityException(validation.errors)));
  }
}
