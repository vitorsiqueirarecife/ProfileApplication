import { IUser } from '../user/user.interface';

export const AUTH_SERVICE = 'IAuthService';

export interface IAuthService {
  login(user: Pick<IUser, 'email' | 'password'>): Promise<boolean>;
}
