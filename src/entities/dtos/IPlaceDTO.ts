import { IPlaceEvaluationDTO } from "./IPlaceEvaluationDTO";

export interface IPlaceDTO {
  id?: number;
  name: string;
  lat: number;
  long: number;

  averageRating?: number;
  evaluations?: IPlaceEvaluationDTO[];
}