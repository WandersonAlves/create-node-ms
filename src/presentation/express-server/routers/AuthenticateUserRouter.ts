import { IAuthorizationDTO } from '../../../entities/dtos/IAuthorizationDTO';
import { ILoginDTO } from '../../../entities/dtos/ILoginDTO';
import { inject, injectable } from 'inversify';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import AuthenticationCase from '../../../useCases/AuthenticationCase';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import InjectionReferences from '../../../container/inversify.references';
import UnprocessableEntityException from '../../../shared/exceptions/UnprocessableEntityException';
import Validator from '../../../shared/Validator';

@injectable()
export default class AuthenticateUserRouter implements RequestRouter {
  @inject(InjectionReferences.AuthenticationCaseRef)
  private authCase: AuthenticationCase;

  route(req: IHttpRequest<ILoginDTO>): Promise<IHttpResponse<IAuthorizationDTO | IHttpError>> {
    const { email, password } = req.body;
    const validation = new Validator().isEmail(email, 'email').exists(password, 'password');
    if (!validation.hasErrors()) {
      return this.authCase.authenticateUser(req.body);
    }
    return Promise.resolve(HttpResponseFactory.error(new UnprocessableEntityException(validation.errors)));
  }
}
