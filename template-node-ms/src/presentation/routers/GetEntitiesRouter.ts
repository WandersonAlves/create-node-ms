import { ID_Entity_DDTO } from "../../dtos/ID_Entity_DDTO";
import { inject, injectable } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError } from "../../shared/interfaces";
import D_Entity_DCase from "../../cases/D_Entity_DCase";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class GetD_Entities_DRouter implements RequestRouter {
  @inject(InjectionReferences.D_Entity_DCaseRef) private case: D_Entity_DCase;

  route(req: IHttpRequest<any, any, any>): Promise<IHttpResponse<ID_Entity_DDTO[] | IHttpError>> {
    return this.case.getD_Entities_D();
  }
}