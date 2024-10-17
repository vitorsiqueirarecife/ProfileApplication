import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SUser,
  UserDocument,
} from 'src/infrastructure/db/mongodb/schemas/user.schema';
import { IUserModel } from 'src/domain/interfaces/user/user.model.interface';
import { IUser } from 'src/domain/interfaces/user/user.interface';

export class MongooseUserModel implements IUserModel {
  constructor(
    @InjectModel(SUser.name) private userModel: Model<UserDocument>,
  ) {}
  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }
}
