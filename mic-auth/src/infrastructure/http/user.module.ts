import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SUser, UserSchema } from '../db/mongodb/schemas/user.schema';
import { MongooseUserModel } from '../db/mongodb/models/mongoose.user.model';
import { UserRepository } from '../db/mongodb/repositories/user.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user/user.repository.interface';
import { USER_MODEL } from 'src/domain/interfaces/user/user.model.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SUser.name, schema: UserSchema }]),
  ],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: USER_MODEL, useClass: MongooseUserModel },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
