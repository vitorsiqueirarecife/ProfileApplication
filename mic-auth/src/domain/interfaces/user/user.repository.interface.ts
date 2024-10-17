import { IUser } from './user.interface';

export const USER_REPOSITORY = 'IUserRepository';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
}
