import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, JoinTable } from 'typeorm';
import { IPlaceDTO } from '../../../../entities/dtos/IPlaceDTO';
import PlaceEvaluationModel from './PlaceEvaluationModel';

@Entity()
export default class PlaceModel extends BaseEntity implements IPlaceDTO {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ type: 'float' }) lat: number;
  @Column({ type: 'float' }) long: number;

  @OneToMany(_type => PlaceEvaluationModel, evaluation => evaluation.place)
  @JoinTable()
  evaluations: PlaceEvaluationModel[];
}