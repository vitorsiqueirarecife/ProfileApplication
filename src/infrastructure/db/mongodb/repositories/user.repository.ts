import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';

import {
  IUserModel,
  USER_MODEL,
} from 'src/domain/interfaces/user.model.interface';
import { IUserRepository } from 'src/domain/interfaces/user.repository.interface';
import { SUser } from 'src/infrastructure/db/mongodb/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(USER_MODEL) private userModel: IUserModel) {}

  async create(user: IUser): Promise<IUser> {
    const sUser = this.toSUser(user);
    return await this.userModel.create(sUser);
  }

  async findByName(name: string): Promise<IUser[]> {
    const sUser = await this.userModel.findByName(name);
    return sUser.map(this.toIUser);
  }

  toSUser(user: IUser): SUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  toIUser(sUser: SUser): IUser {
    return {
      id: sUser.id,
      name: sUser.name,
      email: sUser.email,
      password: sUser.password,
    };
  }
}
