import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/interfaces/user/user.repository.interface';
import { IAuthService } from 'src/domain/interfaces/auth/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(USER_REPOSITORY) private userModel: IUserRepository) {}
  async login(user: Pick<IUser, 'email' | 'password'>): Promise<boolean> {
    return Promise.resolve(true);
    // const { email, password } = user;
    // const user = await this.userService.getOne('username', username);
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { sub: user.id, username: user.username };
    // return this.jwtService.signAsync(payload);
  }
}
