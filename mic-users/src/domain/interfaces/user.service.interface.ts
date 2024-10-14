import { IUser } from './user.interface';

export const USER_SERVICE = 'IUserService';

export interface IUserService {
  create(user: IUser): Promise<IUser>;
  findByName(name: string): Promise<IUser[]>;
}
