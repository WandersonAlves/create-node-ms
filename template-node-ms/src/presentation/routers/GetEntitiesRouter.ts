import { ID_Entity_DDTO } from "../../dtos/ID_Entity_DDTO";
import { inject, injectable } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError, UseCase } from "../../shared/contracts";
import InjectionReferences from "../../infra/container/inversify.references";

@injectable()
export default class GetD_Entities_DRouter implements RequestRouter {
  @inject(InjectionReferences.GetD_Entities_DCaseRef) private case: UseCase;

  route(req: IHttpRequest<any, any, any>): Promise<IHttpResponse<ID_Entity_DDTO[] | IHttpError>> {
    return this.case.execute();
  }
}