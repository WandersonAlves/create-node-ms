import { decodeToken } from '../utils';
import { inject, injectable } from 'inversify';
import { IPlaceEvaluationDTO } from '../../../entities/dtos/IPlaceEvaluationDTO';
import { IUserDTO } from '../../../entities/dtos/IUserDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import InjectionReferences from '../../../container/inversify.references';
import PlacesCase from '../../../useCases/PlacesCase';

@injectable()
export default class EvaluatePlaceRouter implements RequestRouter {
  @inject(InjectionReferences.PlacesCaseRef)
  private placeCase: PlacesCase;

  route(req: IHttpRequest<IPlaceEvaluationDTO>): Promise<IHttpResponse<IPlaceEvaluationDTO | IHttpError>> {
    const { place_id } = req.params;
    const { authorization } = req.headers;
    const { id } = decodeToken<IUserDTO>(authorization);
    return this.placeCase.evaluatePlace(Number(place_id), id, req.body);
  }
}
