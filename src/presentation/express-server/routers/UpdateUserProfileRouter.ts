import { decodeToken } from '../utils';
import { injectable, inject } from 'inversify';
import { IUserDTO } from '../../../entities/dtos/IUserDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import InjectionReferences from '../../../container/inversify.references';
import ProfileCase from '../../../useCases/ProfileCase';
import UnprocessableEntityException from '../../../shared/exceptions/UnprocessableEntityException';
import Validator from '../../../shared/Validator';

@injectable()
export default class UpdateUserProfileRouter implements RequestRouter {
  @inject(InjectionReferences.ProfileCaseRef) private case: ProfileCase;

  route(req: IHttpRequest<{ name: string }>): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const { authorization } = req.headers;
    const { id } = decodeToken<IUserDTO>(authorization);
    const validation = new Validator().exists(req.body.name, 'name');
    if (!validation.hasErrors()) {
      return this.case.alterProfile({ name: req.body.name, id });
    }
    return Promise.resolve(HttpResponseFactory.error(new UnprocessableEntityException(validation.errors)));
  }
}
