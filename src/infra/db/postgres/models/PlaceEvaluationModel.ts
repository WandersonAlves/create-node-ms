import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { IPlaceEvaluationDTO } from '../../../../entities/dtos/IPlaceEvaluationDTO';
import { UserModel } from './UserModel';
import PlaceModel from './PlaceModel';

@Entity()
export default class PlaceEvaluationModel extends BaseEntity implements IPlaceEvaluationDTO {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(_type => PlaceModel, place => place.evaluations)
  @JoinColumn({ name: 'place_id' })
  place: PlaceModel;

  @ManyToOne(_type => UserModel, u => u.evaluations)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column({ nullable: false }) comment: string;
  @Column({ nullable: false }) rating: 1 | 2 | 3 | 4 | 5;

  // tslint:disable: variable-name
  @Column({ nullable: false }) user_id: number;
  @Column({ nullable: false }) place_id: number;
}