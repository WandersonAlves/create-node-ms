import { DataRepository } from '../interfaces';
import { injectable } from 'inversify';
import { IPlaceDTO } from '../dtos/IPlaceDTO';
import { IPlaceEvaluationDTO } from '../dtos/IPlaceEvaluationDTO';
import { TRestParameters } from '../../shared/types';

@injectable()
export default class PlaceInMemoryRepository implements DataRepository<IPlaceDTO> {
  private places: IPlaceDTO[] = [
    {
      id: 1,
      name: 'Home',
      lat: -8.1544512,
      long: -34.9215271,
    },
    {
      id: 2,
      name: 'Churrascaria Ponto Gaúcho',
      lat: -8.1549837,
      long: -34.9175803,
    },
    {
      id: 3,
      name: 'Hapclínica Piedade',
      lat: -8.1630976,
      long: -34.9138467,
    },
    {
      id: 4,
      name: 'Misc Place',
      lat: -8.163667,
      long: -34.9335,
    },
    {
      id: 5,
      name: 'Misc Place 2',
      lat: -8.17187,
      long: -34.924339,
    },
  ];

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

  find(filter?: TRestParameters<IPlaceDTO>): Promise<IPlaceDTO[]> {
    const result = this.places
      .filter(u => this._match(u, filter))
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    return Promise.resolve(result);
  }
  findOne(filter?: TRestParameters<IPlaceDTO>): Promise<IPlaceDTO> {
    const result = this.places.find(u => this._match(u, filter));
    result.evaluations = this.evaluations.filter(e => e.place_id === result.id);
    return Promise.resolve(result);
  }
  create(obj: IPlaceDTO): Promise<IPlaceDTO> {
    this.places.push(obj);
    return Promise.resolve(obj);
  }
  updateById(id: string | number, obj: Partial<IPlaceDTO>): Promise<IPlaceDTO> {
    throw new Error('Method not implemented.');
  }

  private _match(u: IPlaceDTO, filter: TRestParameters<IPlaceDTO>) {
    let hasMatch = true;
    if (!filter) {
      return true;
    }
    Object.entries(filter).map(k => {
      if (hasMatch) {
        const entry = k[0];
        const value = k[1];
        hasMatch = u[entry] === value ? true : false;
      }
    });
    return hasMatch;
  }
}
