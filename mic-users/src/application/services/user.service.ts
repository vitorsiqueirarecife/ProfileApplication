import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/interfaces/user.repository.interface';
import { IUserService } from 'src/domain/interfaces/user.service.interface';
import { v1 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async create(user: IUser): Promise<IUser> {
    user.id = uuid();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    return await this.userRepository.create(user);
  }

  async findByName(name: string): Promise<IUser[]> {
    return await this.userRepository.findByName(name);
  }
}
