import { ID_Entity_DDTO } from "../../dtos/ID_Entity_DDTO";
import { injectable, inject } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError, UseCase } from "../../shared/interfaces";
import InjectionReferences from "../../container/inversify.references";

@injectable()
export default class CreateD_Entity_DRouter implements RequestRouter {
  @inject(InjectionReferences.CreateD_Entity_DCaseRef) private case: UseCase;
  route(req: IHttpRequest<ID_Entity_DDTO, any, any>): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    return this.case.execute(req.body);
  }
}