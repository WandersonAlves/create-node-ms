import { IEntityDTO } from '../../entities/dtos/IEntityDTO';
import { inject, injectable } from 'inversify';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from '../../shared/interfaces';
import EntityCase from '../../cases/EntityCase';
import InjectionReferences from '../../container/inversify.references';

@injectable()
export default class GetEntityRouter implements RequestRouter {
  @inject(InjectionReferences.EntityCaseRef) private case: EntityCase;

  route(req: IHttpRequest<any, any, { id: number }>): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    return this.case.getEntity(req.params.id);
  }
}
