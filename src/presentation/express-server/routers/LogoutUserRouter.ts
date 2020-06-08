import { inject, injectable } from 'inversify';
import { RequestRouter, IHttpRequest, IHttpResponse } from '../../interfaces';
import AuthenticationCase from '../../../useCases/AuthenticationCase';
import InjectionReferences from '../../../container/inversify.references';

@injectable()
export default class LogoutUserRouter implements RequestRouter {
  @inject(InjectionReferences.AuthenticationCaseRef)
  private authCase: AuthenticationCase;

  route(req: IHttpRequest): Promise<IHttpResponse<any>> {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    return this.authCase.logoutUser(token);
  }
}
