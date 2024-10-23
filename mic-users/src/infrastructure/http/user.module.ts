import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/application/services/user.service';
import { UserResolver } from 'src/presentation/resolvers/user.resolver';
import { SUser, UserSchema } from '../db/mongodb/schemas/user.schema';
import { MongooseUserModel } from '../db/mongodb/models/mongoose.user.model';
import { USER_SERVICE } from 'src/domain/interfaces/user.service.interface';
import { UserRepository } from '../db/mongodb/repositories/user.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository.interface';
import { USER_MODEL } from 'src/domain/interfaces/user.model.interface';
import { LOGGER_PROVIDER } from 'src/domain/interfaces/logger.interface';
import { WinstonLogger } from '../logging/winston.logger';
import { EventsModule } from './events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SUser.name, schema: UserSchema }]),
    EventsModule,
  ],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useClass: WinstonLogger,
    },
    UserResolver,
    { provide: USER_SERVICE, useClass: UserService },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: USER_MODEL, useClass: MongooseUserModel },
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
