import { DataRepository, IHttpResponse, IHttpError, UseCase } from '../shared/contracts';
import { ID_Entity_DDTO } from '../dtos/ID_Entity_DDTO';
import { injectable, inject } from 'inversify';
import { OK } from 'http-status';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../infra/container/inversify.references';

@injectable()
export default class GetD_Entities_DCase implements UseCase {
  @inject(InjectionReferences.D_Entity_DRepositoryRef) private D_entity_DRepo: DataRepository<ID_Entity_DDTO>;

  @ExceptionHandler()
  async execute(): Promise<IHttpResponse<ID_Entity_DDTO[] | IHttpError>> {
    const D_entities_D = await this.D_entity_DRepo.find();
    return HttpResponseFactory.success(OK, D_entities_D);
  }
}
