import { IsString } from "class-validator";
import { ID_Entity_DDTO } from "./ID_Entity_DDTO";

export class D_Entity_DValidatorClass implements ID_Entity_DDTO {

  @IsString()
  name: string;

  constructor(payload: ID_Entity_DDTO) {
    Object.assign(this, {...this, ...payload });
  }
}