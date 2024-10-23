import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SUser,
  UserDocument,
} from 'src/infrastructure/db/mongodb/schemas/user.schema';
import { IUserModel } from 'src/domain/interfaces/user/user.model.interface';

export class MongooseUserModel implements IUserModel {
  constructor(
    @InjectModel(SUser.name) private userModel: Model<UserDocument>,
  ) {}

  async create(user: SUser): Promise<SUser> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findByName(name: string): Promise<SUser[]> {
    return await this.userModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }
}
