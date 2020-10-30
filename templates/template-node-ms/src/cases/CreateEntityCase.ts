import { DataRepository, IHttpResponse, IHttpError, UseCase } from '../shared/contracts';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable, inject } from 'inversify';
import { CREATED } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../infra/container/inversify.references';

@injectable()
export default class CreateD_Entity_DCase implements UseCase {
  @inject(InjectionReferences.D_Entity_DRepositoryRef) private D_entity_DRepo: DataRepository<ID_Entity_DDTO>;

  @ExceptionHandler()
  async execute(D_entity_D: ID_Entity_DDTO): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    const savedD_Entity_D = await this.D_entity_DRepo.create(D_entity_D);
    return HttpResponseFactory.success(CREATED, savedD_Entity_D);
  }
}
