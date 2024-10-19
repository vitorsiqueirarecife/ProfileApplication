import {
  Injectable,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const foundUser = await this.userRepository.findByEmail(email);

      if (!foundUser) {
        throw new UnauthorizedException('User not found');
      }

      return foundUser;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
