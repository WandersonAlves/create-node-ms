import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { IUserDTO } from '../../../../entities/dtos/IUserDTO';
import PlaceEvaluationModel from './PlaceEvaluationModel';

@Entity()
export class UserModel extends BaseEntity implements IUserDTO {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: false }) name: string;
  @Column({ nullable: false, unique: true }) email: string;
  @Column() passwordHash: string;

  @OneToMany(_type => PlaceEvaluationModel, e => e.user)
  evaluations: PlaceEvaluationModel[];
}
