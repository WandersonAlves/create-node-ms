import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DataRepository } from '../entities/interfaces';
import { IAuthorizationDTO } from '../entities/dtos/IAuthorizationDTO';
import { ICreateUserDTO } from '../entities/dtos/ICreateUserDTO';
import { IHttpResponse, IHttpError } from '../presentation/interfaces';
import { ILoginDTO } from '../entities/dtos/ILoginDTO';
import { injectable, inject } from 'inversify';
import { IUserDTO } from '../entities/dtos/IUserDTO';
import { OK, CREATED } from 'http-status';
import AuthException from '../shared/exceptions/AuthException';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';

@injectable()
export default class AuthenticationCase {
  @inject(InjectionReferences.UserRepositoryRef) private userRepo: DataRepository<IUserDTO>;

  @ExceptionHandler()
  async authenticateUser(loginInfo: ILoginDTO): Promise<IHttpResponse<IAuthorizationDTO | IHttpError>> {
    const { email, password } = loginInfo;
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      return HttpResponseFactory.error(new AuthException(AuthException.LoginDontExists));
    }
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return HttpResponseFactory.error(new AuthException(AuthException.LoginPasswordNotAllowed));
    }
    Reflect.deleteProperty(user, 'passwordHash');
    const authorizationResponse: IAuthorizationDTO = {
      data: user,
      token: jwt.sign(user, 'random-secret', {
        expiresIn: '1d',
      }),
    };
    return HttpResponseFactory.success(OK, authorizationResponse);
  }

  @ExceptionHandler()
  async logoutUser(token: string): Promise<IHttpResponse<null | IHttpError>> {
    return null;
  }

  @ExceptionHandler()
  async createUser(createUserDTO: ICreateUserDTO): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const userDTO: IUserDTO = {
      email: createUserDTO.email,
      name: createUserDTO.name,
      passwordHash: await bcrypt.hash(createUserDTO.password, 10),
    };
    const createdUser = await this.userRepo.create(userDTO);
    return HttpResponseFactory.success(CREATED, createdUser);
  }
}
