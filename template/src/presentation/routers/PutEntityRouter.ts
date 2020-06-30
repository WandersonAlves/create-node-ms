import { IEntityDTO } from "../../entities/dtos/IEntityDTO";
import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../shared/interfaces";
import EntityCase from "../../cases/EntityCase";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class PutEntityRouter implements RequestRouter {
  @inject(InjectionReferences.EntityCaseRef) private case: EntityCase;
  route(req: IHttpRequest<IEntityDTO, { id: string }, any>): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    return this.case.updateEntity(Number(req.query.id), req.body);
  }
}