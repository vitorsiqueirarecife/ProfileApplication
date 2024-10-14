import { IUser } from './user.interface';

export const USER_MODEL = 'IUserModel';
export interface IUserModel {
  create(user: IUser): Promise<IUser>;
  findByName(name: string): Promise<IUser[]>;
}
