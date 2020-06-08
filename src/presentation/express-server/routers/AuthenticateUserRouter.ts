import { ILoginDTO } from "../../../entities/dtos/ILoginDTO";
import { inject, injectable } from "inversify";
import { RequestRouter, IHttpRequest, IHttpResponse } from "../../interfaces";
import AuthenticationCase from "../../../useCases/AuthenticationCase";
import InjectionReferences from "../../../container/inversify.references";

@injectable()
export default class AuthenticateUserRouter implements RequestRouter {
  @inject(InjectionReferences.AuthenticationCaseRef)
  private authCase: AuthenticationCase;

  route(req: IHttpRequest<ILoginDTO>): Promise<IHttpResponse<any>> {
    return this.authCase.authenticateUser(req.body);
  }
}