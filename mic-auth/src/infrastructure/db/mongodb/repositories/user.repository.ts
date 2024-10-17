import { Injectable, Inject } from '@nestjs/common';
import UserParse from 'src/application/common/parsers/user.parse';
import { IUser } from 'src/domain/interfaces/user/user.interface';

import {
  IUserModel,
  USER_MODEL,
} from 'src/domain/interfaces/user/user.model.interface';
import { IUserRepository } from 'src/domain/interfaces/user/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(USER_MODEL) private userModel: IUserModel) {}
  async findByEmail(email: string): Promise<IUser> {
    const sUser = await this.userModel.findByEmail(email);
    return UserParse.toIUser(sUser);
  }
}
