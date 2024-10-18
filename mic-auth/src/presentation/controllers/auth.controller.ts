import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from 'src/application/dtos/login.dto';
import {
  IAuthService,
  AUTH_SERVICE,
} from 'src/domain/interfaces/auth/auth.service.interface';
import {
  LOGGER_PROVIDER,
  ILogger,
} from 'src/domain/interfaces/logger.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: ILogger,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { email, password } = loginDto;

    this.logger.info(`AuthController.login.login: ${email}`);

    const token = await this.authService.login({
      email,
      password,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return { message: 'Authentication successfully' };
  }
}
