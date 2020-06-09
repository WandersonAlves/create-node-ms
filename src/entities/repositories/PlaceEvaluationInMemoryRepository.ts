import { DataRepository } from '../interfaces';
import { injectable } from 'inversify';
import { IPlaceEvaluationDTO } from '../dtos/IPlaceEvaluationDTO';
import { TRestParameters } from '../../shared/types';

@injectable()
export default class PlaceEvaluationInMemoryRepository implements DataRepository<IPlaceEvaluationDTO> {
  private evaluations: IPlaceEvaluationDTO[] = [
    {
      id: 2,
      comment: 'Minha casinha',
      rating: 5,
      user_id: 1,
      place_id: 1,
    },
    {
      id: 3,
      comment: 'Rola umas baladas lá',
      rating: 3,
      user_id: 1,
      place_id: 1,
    },
    {
      id: 5,
      comment: 'Melhor lugar do mundo',
      rating: 5,
      user_id: 1,
      place_id: 1,
    },
  ];

  find(filter?: TRestParameters<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO[]> {
    throw new Error('Method not implemented.');
  }
  findOne(filter?: TRestParameters<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO> {
    throw new Error('Method not implemented.');
  }
  create(obj: IPlaceEvaluationDTO): Promise<IPlaceEvaluationDTO> {
    this.evaluations.push(obj);
    return Promise.resolve(obj);
  }
  updateById(id: string | number, obj: Partial<IPlaceEvaluationDTO>): Promise<IPlaceEvaluationDTO> {
    throw new Error('Method not implemented.');
  }

}
