import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user.service.interface';
import {
  LOGGER_PROVIDER,
  ILogger,
} from 'src/domain/interfaces/logger.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: ILogger,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    this.logger.info(`UserController.createUser.create: ${email}`);

    await this.userService.create({
      id: '',
      email,
      name,
      password,
    });

    return { message: 'User created successfully', user: createUserDto };
  }
}
