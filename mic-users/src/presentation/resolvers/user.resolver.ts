import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserBase } from 'src/domain/entities/user-base.entity';
import {
  ILogger,
  LOGGER_PROVIDER,
} from 'src/domain/interfaces/logger.interface';
import { IUserBase } from 'src/domain/interfaces/user-base.interface';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user.service.interface';

@Resolver(() => UserBase)
export class UserResolver {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: ILogger,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Query(() => [UserBase], { name: 'searchUsers' })
  async searchUsers(@Args('name') name: string): Promise<IUserBase[]> {
    this.logger.info(`UserResolver.searchUsers.findByName: ${name}`);

    return await this.userService.findByName(name);
  }
}
