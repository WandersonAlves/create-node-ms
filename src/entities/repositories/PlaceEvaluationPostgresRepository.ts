import { DataRepository } from '../interfaces';
import { injectable } from 'inversify';
import { IPlaceEvaluationDTO } from '../dtos/IPlaceEvaluationDTO';
import { TRestParameters } from '../../shared/types';
import PlaceEvaluationModel from '../../infra/db/postgres/models/PlaceEvaluationModel';

@injectable()
export default class PlaceEvaluationPostgresRepository implements DataRepository<IPlaceEvaluationDTO> {
  async find(filter?: TRestParameters<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO[]> {
    const evaluations = await PlaceEvaluationModel.find({
      where: {
        ...filter,
      },
    });
    return evaluations;
  }

  async findOne(filter?: TRestParameters<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO> {
    const evaluation = await PlaceEvaluationModel.findOne({
      where: {
        ...filter,
      },
    });
    if (!evaluation) {
      return null;
    }
    return {
      id: evaluation.id,
      comment: evaluation.comment,
      rating: evaluation.rating,
    };
  }

  async create(obj: IPlaceEvaluationDTO): Promise<IPlaceEvaluationDTO> {
    const evaluation = new PlaceEvaluationModel();
    evaluation.rating = obj.rating;
    evaluation.comment = obj.comment;
    evaluation.place_id = obj.place_id;
    evaluation.user_id = obj.user_id;
    const savedEval = await evaluation.save();
    return savedEval;
  }

  updateById(id: string | number, obj: Partial<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO> {
    throw new Error('Method not implemented.');
  }
}
