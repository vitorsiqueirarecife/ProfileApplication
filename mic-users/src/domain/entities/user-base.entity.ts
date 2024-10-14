import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUserBase } from '../interfaces/user-base.interface';

@ObjectType()
export class UserBase implements IUserBase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
