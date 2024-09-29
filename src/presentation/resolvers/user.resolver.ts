import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from 'src/domain/entities/user.entity';
import { IUser } from 'src/domain/interfaces/user.interface';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user.service.interface';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Query(() => [User], { name: 'searchUsers' })
  async searchUsers(@Args('name') name: string): Promise<IUser[]> {
    return await this.userService.findByName(name);
  }
}
