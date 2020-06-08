import { IUserDTO } from "./IUserDTO";

export interface IAuthorizationDTO {
  token: string;
  data: Partial<IUserDTO>;
}