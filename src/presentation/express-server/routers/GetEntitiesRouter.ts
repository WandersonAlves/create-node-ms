import { IEntityDTO } from "../../../entities/dtos/IEntityDTO";
import { inject, injectable } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../../shared/interfaces";
import EntityCase from "../../../useCases/EntityCase";
import InjectionReferences from "../../../container/inversify.references";

@injectable()
export default class GetEntitiesRouter implements RequestRouter {
  @inject(InjectionReferences.EntityCaseRef) private case: EntityCase;

  route(req: IHttpRequest<any, any, any>): Promise<IHttpResponse<IEntityDTO[] | IHttpError>> {
    return this.case.getEntities();
  }
}