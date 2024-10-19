import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth.service';
import { AUTH_SERVICE } from 'src/domain/interfaces/auth/auth.service.interface';
import { LOGGER_PROVIDER } from 'src/domain/interfaces/logger.interface';
import { WinstonLogger } from '../logging/winston.logger';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../security/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtOptions), UserModule],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useClass: WinstonLogger,
    },
    { provide: AUTH_SERVICE, useClass: AuthService },
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
