import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
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
    try {
      this.logger.info(`AuthController.login.login: ${loginDto.email}`);

      const token = await this.authService.login({
        email: loginDto.email,
        password: loginDto.password,
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });

      return res.status(HttpStatus.OK).json({ message: 'Login successful' });
    } catch {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
