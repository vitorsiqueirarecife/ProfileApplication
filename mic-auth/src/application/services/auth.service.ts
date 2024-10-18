import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import { IAuthService } from 'src/domain/interfaces/auth/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import {
  IUserService,
  USER_SERVICE,
} from 'src/domain/interfaces/user/user.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async login(user: Pick<IUser, 'email' | 'password'>): Promise<string> {
    const { email, password } = user;
    const foundUser = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: foundUser.id, username: foundUser.email };
    return this.jwtService.signAsync(payload);
  }
}
