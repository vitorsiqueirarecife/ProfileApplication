import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/interfaces/user/user.repository.interface';

import { IUserService } from 'src/domain/interfaces/user/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {}
  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findByEmail(email);
  }
}
