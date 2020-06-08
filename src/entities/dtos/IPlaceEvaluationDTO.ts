export interface IPlaceEvaluationDTO {
  id?: number;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // TypeORM Fields
  place_id?: number;
  user_id?: number;
}