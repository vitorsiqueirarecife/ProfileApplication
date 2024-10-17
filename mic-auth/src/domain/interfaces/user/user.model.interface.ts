import { IUser } from './user.interface';

export const USER_MODEL = 'IUserModel';
export interface IUserModel {
  findByEmail(name: string): Promise<IUser>;
}
