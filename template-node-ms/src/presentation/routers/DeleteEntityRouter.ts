import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../shared/interfaces";
import D_Entity_DCase from "../../cases/D_Entity_DCase";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class DeleteD_Entity_DRouter implements RequestRouter {
  @inject(InjectionReferences.D_Entity_DCaseRef) private case: D_Entity_DCase;
  route(req: IHttpRequest<any, { id: string }, any>): Promise<IHttpResponse<null | IHttpError>> {
    return this.case.deleteD_Entity_D(Number(req.query.id));
  }
}