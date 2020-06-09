import { ICreateUserDTO } from '../../../entities/dtos/ICreateUserDTO';
import { inject, injectable } from 'inversify';
import { IUserDTO } from '../../../entities/dtos/IUserDTO';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../interfaces';
import AuthenticationCase from '../../../useCases/AuthenticationCase';
import HttpResponseFactory from '../../factory/HttpResponseFactory';
import InjectionReferences from '../../../container/inversify.references';
import UnprocessableEntityException from '../../../shared/exceptions/UnprocessableEntityException';
import Validator from '../../../shared/Validator';

@injectable()
export default class CreateUserRouter implements RequestRouter {
  @inject(InjectionReferences.AuthenticationCaseRef)
  private authCase: AuthenticationCase;

  route(req: IHttpRequest<ICreateUserDTO>): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const { email, name, password } = req.body;
    const validation = new Validator().isEmail(email, 'email').exists(name, 'name').exists(password, 'password');
    if (!validation.hasErrors()) {
      return this.authCase.createUser(req.body);
    }
    return Promise.resolve(HttpResponseFactory.error(new UnprocessableEntityException(validation.errors)));
  }
}
