import { DataRepository } from '../interfaces';
import { FindConditions } from 'typeorm';
import { injectable } from 'inversify';
import { IUserDTO } from '../dtos/IUserDTO';
import { TRestParameters } from '../../shared/types';
import { UserModel } from '../../infra/db/postgres/models/UserModel';

@injectable()
export default class UserPostgresRepository implements DataRepository<IUserDTO> {
  async find(filter?: TRestParameters<FindConditions<UserModel>>): Promise<IUserDTO[]> {
    const users = await UserModel.find({
      where: {
        ...filter,
      },
    });
    return users;
  }

  async findOne(filter?: TRestParameters<FindConditions<UserModel>>): Promise<IUserDTO> {
    const user = await UserModel.findOne({
      where: {
        ...filter,
      },
    });
    if (!user) {
      return null;
    }
    return {
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      id: user.id,
    };
  }

  async create(obj: IUserDTO): Promise<IUserDTO> {
    const user = new UserModel();
    user.email = obj.email;
    user.name = obj.name;
    user.passwordHash = obj.passwordHash;
    const savedUser = await user.save();
    return savedUser;
  }

  async updateById(id: string | number, obj: Partial<IUserDTO>): Promise<IUserDTO> {
    const user = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    await UserModel.update(id, obj);
    return {
      ...user,
      ...obj
    };
  }
}
