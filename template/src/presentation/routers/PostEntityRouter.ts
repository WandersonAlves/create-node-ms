import { IEntityDTO } from "../../entities/dtos/IEntityDTO";
import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../shared/interfaces";
import EntityCase from "../../useCases/EntityCase";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class PostEntityRouter implements RequestRouter {
  @inject(InjectionReferences.EntityCaseRef) private case: EntityCase;
  route(req: IHttpRequest<IEntityDTO, any, any>): Promise<IHttpResponse<IEntityDTO | IHttpError>> {
    return this.case.createEntity(req.body);
  }
}