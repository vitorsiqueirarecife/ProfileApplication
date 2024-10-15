import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';

import {
  IUserModel,
  USER_MODEL,
} from 'src/domain/interfaces/user.model.interface';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import UserParse from 'src/infrastructure/parsers/user.parse';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(USER_MODEL) private userModel: IUserModel) {}

  async create(user: IUser): Promise<IUser> {
    const sUser = UserParse.toSUser(user);
    return await this.userModel.create(sUser);
  }

  async findByName(name: string): Promise<IUser[]> {
    const sUser = await this.userModel.findByName(name);
    return sUser.map(UserParse.toIUser);
  }
}
