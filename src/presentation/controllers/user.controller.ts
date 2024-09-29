import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user.service.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    await this.userService.create({
      id: '',
      email,
      name,
      password,
    });

    return { message: 'User created successfully', user: createUserDto };
  }
}
