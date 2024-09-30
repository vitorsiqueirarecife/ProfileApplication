import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from 'src/domain/entities/user.entity';
import {
  ILogger,
  LOGGER_PROVIDER,
} from 'src/domain/interfaces/logger.interface';
import { IUser } from 'src/domain/interfaces/user.interface';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user.service.interface';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: ILogger,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Query(() => [User], { name: 'searchUsers' })
  async searchUsers(@Args('name') name: string): Promise<IUser[]> {
    this.logger.info(`UserResolver.searchUsers.findByName: ${name}`);

    return await this.userService.findByName(name);
  }
}
