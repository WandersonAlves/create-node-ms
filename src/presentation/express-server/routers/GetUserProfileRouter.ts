import { decodeToken } from '../utils';
import { injectable, inject } from 'inversify';
import { IUserDTO } from '../../../entities/dtos/IUserDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import InjectionReferences from '../../../container/inversify.references';
import ProfileCase from '../../../useCases/ProfileCase';

@injectable()
export default class GetUserProfileRouter implements RequestRouter {
  @inject(InjectionReferences.ProfileCaseRef) private case: ProfileCase;

  route(req: IHttpRequest): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const { authorization } = req.headers;
    const { id } = decodeToken<IUserDTO>(authorization);
    return this.case.getProfile(id);
  }
}
