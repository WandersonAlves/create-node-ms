import { DataRepository, IHttpResponse, IHttpError } from '../shared/interfaces';
import { IEntityDTO } from '../entities/dtos/IEntityDTO';
import { injectable, inject } from 'inversify';
import { OK, CREATED } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';

@injectable()
export default class EntityCase {
  @inject(InjectionReferences.EntityRepositoryRef) private entityRepo: DataRepository<IEntityDTO>;

  @ExceptionHandler()
  async getEntities(): Promise<IHttpResponse<IEntityDTO[] | IHttpError>> {
    const entities = await this.entityRepo.find();
    return HttpResponseFactory.success(OK, entities);
  }

  @ExceptionHandler()
  async getEntity(id: number): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    const entity = await this.entityRepo.findOne({ id });
    return HttpResponseFactory.success(OK, entity);
  }

  @ExceptionHandler()
  async createEntity(entity: IEntityDTO): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    const savedEntity = await this.entityRepo.create(entity);
    return HttpResponseFactory.success(CREATED, savedEntity);
  }

  @ExceptionHandler()
  async updateEntity(id: number, entity: IEntityDTO): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    const savedEntity = await this.entityRepo.updateById(id, entity);
    return HttpResponseFactory.success(OK, savedEntity);
  }

  @ExceptionHandler()
  async deleteEntity(id: number): Promise<IHttpResponse<null | IHttpError>> {
    await this.entityRepo.removeById(id);
    return HttpResponseFactory.success(OK, null);
  }
}
