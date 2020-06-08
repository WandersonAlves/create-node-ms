import { ICreateUserDTO } from '../../../entities/dtos/ICreateUserDTO';
import { inject, injectable } from 'inversify';
import { IUserDTO } from '../../../entities/dtos/IUserDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import AuthenticationCase from '../../../useCases/AuthenticationCase';
import InjectionReferences from '../../../container/inversify.references';

@injectable()
export default class CreateUserRouter implements RequestRouter {
  @inject(InjectionReferences.AuthenticationCaseRef)
  private authCase: AuthenticationCase;

  route(req: IHttpRequest<ICreateUserDTO>): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    return this.authCase.createUser(req.body);
  }
}
