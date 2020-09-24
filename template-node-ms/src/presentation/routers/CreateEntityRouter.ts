import { ID_Entity_DDTO } from "../../dtos/ID_Entity_DDTO";
import { D_Entity_DValidatorClass } from "../../dtos/CreateD_Entity_DValidator"
import { injectable, inject } from "inversify";
import { validateSync, ValidationError } from 'class-validator';
import { RequestRouter, IHttpRequest, IHttpResponse, IHttpError, UseCase } from "../../shared/contracts";
import InjectionReferences from "../../infra/container/inversify.references";
import HttpResponseFactory from '../factory/HttpResponseFactory';
import UnprocessableObjectException from '../../shared/exceptions/UnprocessableObjectException';

@injectable()
export default class CreateD_Entity_DRouter implements RequestRouter {
  @inject(InjectionReferences.CreateD_Entity_DCaseRef) private case: UseCase;
  route(req: IHttpRequest<ID_Entity_DDTO, any, any>): Promise<IHttpResponse<ID_Entity_DDTO | IHttpError>> {
    const createD_Entity_DValidator = new D_Entity_DValidatorClass(req.body);
    const validationResult: ValidationError[] = validateSync(createD_Entity_DValidator);
    if (validationResult.length) {
      return Promise.resolve(HttpResponseFactory.error(new UnprocessableObjectException(validationResult)));
    }
    return this.case.execute(req.body);
  }
}