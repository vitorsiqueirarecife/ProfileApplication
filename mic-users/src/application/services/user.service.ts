import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/interfaces/user.repository.interface';
import { IUserService } from 'src/domain/interfaces/user.service.interface';
import { v1 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  EVENT_SERVICE,
  IEventService,
} from 'src/domain/interfaces/events.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(EVENT_SERVICE) private eventService: IEventService,
  ) {}

  async create(user: IUser): Promise<IUser> {
    try {
      user.id = uuid();

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      const newUser = await this.userRepository.create(user);

      await this.eventService.publish({
        type: 'user_created',
        data: user,
      });

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByName(name: string): Promise<IUser[]> {
    return await this.userRepository.findByName(name);
  }
}
