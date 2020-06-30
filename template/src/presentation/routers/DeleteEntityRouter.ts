import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../shared/interfaces";
import EntityCase from "../../cases/EntityCase";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class DeleteEntityRouter implements RequestRouter {
  @inject(InjectionReferences.EntityCaseRef) private case: EntityCase;
  route(req: IHttpRequest<any, { id: string }, any>): Promise<IHttpResponse<null | IHttpError>> {
    return this.case.deleteEntity(Number(req.query.id));
  }
}