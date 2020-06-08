import { DataRepository } from '../interfaces';
import { injectable } from 'inversify';
import { IPlaceDTO } from '../dtos/IPlaceDTO';
import { TRestParameters } from '../../shared/types';
import PlaceModel from '../../infra/db/postgres/models/PlaceModel';

@injectable()
export default class PlacePostgresRepository implements DataRepository<IPlaceDTO> {
  async find(filter?: TRestParameters<IPlaceDTO>): Promise<IPlaceDTO[]> {
    const places = await PlaceModel.find({
      where: {
        ...filter,
      },
      order: {
        name: 'ASC'
      }
    });
    return places;
  }

  async findOne(filter?: TRestParameters<IPlaceDTO>): Promise<IPlaceDTO> {
    const place = await PlaceModel.findOne({
      where: {
        ...filter,
      },
      relations: ['evaluations'],
    });
    if (!place) {
      return null;
    }
    return {
      id: place.id,
      lat: place.lat,
      long: place.long,
      name: place.name,
      averageRating: Number(
        (place.evaluations.reduce((acc, curr) => acc + curr.rating, 0) / place.evaluations.length).toFixed(2),
      ),
      evaluations: place.evaluations,
    };
  }

  async create(obj: IPlaceDTO): Promise<IPlaceDTO> {
    const place = new PlaceModel();
    place.lat = obj.lat;
    place.name = obj.name;
    place.long = obj.long;
    const savedPlace = await place.save();
    return savedPlace;
  }

  updateById(id: string | number, obj: Partial<IPlaceDTO>): Promise<IPlaceDTO> {
    throw new Error('Method not implemented.');
  }
}
