import { IPlaceEvaluationDTO } from "./IPlaceEvaluationDTO";

export interface ICreatePlaceEvaluationDTO {
  place_id: number;
  user_id: number;
  evaluation: IPlaceEvaluationDTO;
}