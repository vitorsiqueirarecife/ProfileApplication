import { SUser } from 'src/infrastructure/db/mongodb/schemas/user.schema';
import { IUser } from './user.interface';

export const USER_REPOSITORY = 'IUserRepository';

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByName(name: string): Promise<IUser[]>;
  toSUser(user: IUser): SUser;
  toIUser(sUser: SUser): IUser;
}
