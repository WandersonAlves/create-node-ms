import { DataRepository } from '../entities/interfaces';
import { IHttpError, IHttpResponse } from '../presentation/interfaces';
import { inject, injectable } from 'inversify';
import { IUpdateUserDTO } from '../entities/dtos/IUpdateUserDTO';
import { IUserDTO } from '../entities/dtos/IUserDTO';
import { OK } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';

@injectable()
export default class ProfileCase {
  @inject(InjectionReferences.UserRepositoryRef) private userRepo: DataRepository<IUserDTO>;

  @ExceptionHandler()
  async getProfile(userID: number): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const result = await this.userRepo.findOne({ id: userID });
    Reflect.deleteProperty(result, 'passwordHash');
    return HttpResponseFactory.success(OK, result);
  }

  @ExceptionHandler()
  async alterProfile({ id, name }: IUpdateUserDTO): Promise<IHttpResponse<IUserDTO | IHttpError>> {
    const result = await this.userRepo.updateById(id, { name });
    Reflect.deleteProperty(result, 'passwordHash');
    return HttpResponseFactory.success(OK, result);
  }
}
