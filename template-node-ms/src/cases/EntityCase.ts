import { DataRepository, IHttpResponse, IHttpError } from '../shared/interfaces';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable, inject } from 'inversify';
import { OK, CREATED } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';

@injectable()
export default class D_Entity_DCase {
  @inject(InjectionReferences.D_Entity_DRepositoryRef) private D_entity_DRepo: DataRepository<ID_Entity_DDTO>;

  @ExceptionHandler()
  async getD_Entities_D(): Promise<IHttpResponse<ID_Entity_DDTO[] | IHttpError>> {
    const D_entities_D = await this.D_entity_DRepo.find();
    return HttpResponseFactory.success(OK, D_entities_D);
  }

  @ExceptionHandler()
  async getD_Entity_D(id: number): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    const D_entity_D = await this.D_entity_DRepo.findOne({ id });
    return HttpResponseFactory.success(OK, D_entity_D);
  }

  @ExceptionHandler()
  async createD_Entity_D(D_entity_D: ID_Entity_DDTO): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    const savedD_Entity_D = await this.D_entity_DRepo.create(D_entity_D);
    return HttpResponseFactory.success(CREATED, savedD_Entity_D);
  }

  @ExceptionHandler()
  async updateD_Entity_D(id: number, D_entity_D: ID_Entity_DDTO): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    const savedD_Entity_D = await this.D_entity_DRepo.updateById(id, D_entity_D);
    return HttpResponseFactory.success(OK, savedD_Entity_D);
  }

  @ExceptionHandler()
  async deleteD_Entity_D(id: number): Promise<IHttpResponse<null | IHttpError>> {
    await this.D_entity_DRepo.removeById(id);
    return HttpResponseFactory.success(OK, null);
  }
}
