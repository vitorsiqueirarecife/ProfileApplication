import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/login.dto';
import {
  IAuthService,
  AUTH_SERVICE,
} from 'src/domain/interfaces/auth/auth.service.interface';
import {
  LOGGER_PROVIDER,
  ILogger,
} from 'src/domain/interfaces/logger.interface';

@Controller('users')
export class AuthController {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: ILogger,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    this.logger.info(`AuthController.login.login: ${email}`);

    await this.authService.login({
      email,
      password,
    });

    return { message: 'Authentication successfully' };
  }
}
