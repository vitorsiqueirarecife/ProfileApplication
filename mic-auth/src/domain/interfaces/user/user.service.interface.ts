import { IUser } from './user.interface';

export const USER_SERVICE = 'IUserService';

export interface IUserService {
  findByEmail(email: string): Promise<IUser>;
}
