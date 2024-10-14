import { IUserBase } from './user-base.interface';

export interface IUser extends IUserBase {
  password: string;
}
