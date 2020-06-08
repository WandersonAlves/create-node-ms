import { CREATED, OK } from 'http-status';
import { DataRepository } from '../entities/interfaces';
import { IGetPlacesDTO } from '../entities/dtos/IGetPlacesDTO';
import { IHttpError, IHttpResponse } from '../presentation/interfaces';
import { inject, injectable } from 'inversify';
import { IPlaceDTO } from '../entities/dtos/IPlaceDTO';
import { IPlaceEvaluationDTO } from '../entities/dtos/IPlaceEvaluationDTO';
import EntityNotFoundException from '../shared/exceptions/EntityNotFoundException';
import ExceptionHandler from '../shared/decorators/ExceptionHandler';
import HttpResponseFactory from '../presentation/factory/HttpResponseFactory';
import InjectionReferences from '../container/inversify.references';

@injectable()
export default class PlacesCase {
  @inject(InjectionReferences.PlaceRepositoryRef) private placeRepo: DataRepository<IPlaceDTO>;
  @inject(InjectionReferences.PlaceEvaluationRepositoryRef) private placeEvalRepo: DataRepository<IPlaceEvaluationDTO>;

  @ExceptionHandler()
  async createNewPlace(placeDTO: IPlaceDTO): Promise<IHttpResponse<IPlaceDTO | IHttpError>> {
    const place = await this.placeRepo.create(placeDTO);
    return HttpResponseFactory.success(CREATED, place);
  }

  @ExceptionHandler()
  async getPlaces({ lat, long, mode }: IGetPlacesDTO): Promise<IHttpResponse<IPlaceDTO[] | IHttpError>> {
    const places = await this.placeRepo.find();
    if (mode === 'map') {
      const geoSortedPlaces = places.sort((a, b) => {
        const calcDistance = (lat1, lon1, lat2, lon2) => {
          const radlat1 = (Math.PI * lat1) / 180;
          const radlat2 = (Math.PI * lat2) / 180;
          const theta = lon1 - lon2;
          const radtheta = (Math.PI * theta) / 180;
          let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = (dist * 180) / Math.PI;
          dist = dist * 60 * 1.1515;
          dist = dist * 1.609344;
          return dist;
        };
        return calcDistance(lat, long, a.lat, a.long) - calcDistance(lat, long, b.lat, b.long);
      });
      return HttpResponseFactory.success(OK, geoSortedPlaces);
    }
    return HttpResponseFactory.success(OK, places);
  }

  @ExceptionHandler()
  async getPlace(placeID: number): Promise<IHttpResponse<IPlaceDTO | IHttpError>> {
    const place = await this.placeRepo.findOne({ id: placeID });
    if (!place) {
      return HttpResponseFactory.error(new EntityNotFoundException({ placeID }));
    }
    return HttpResponseFactory.success(OK, place);
  }

  @ExceptionHandler()
  async evaluatePlace(
    placeID: number,
    userID: number,
    placeEval: IPlaceEvaluationDTO,
  ): Promise<IHttpResponse<IPlaceEvaluationDTO | IHttpError>> {
    const evaluation = await this.placeEvalRepo.create({
      comment: placeEval.comment,
      rating: placeEval.rating,
      place_id: placeID,
      user_id: userID,
    });
    return HttpResponseFactory.success(CREATED, evaluation);
  }
}
