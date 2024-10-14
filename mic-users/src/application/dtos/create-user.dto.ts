import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The name must be a string.' })
  @MinLength(2, { message: 'The name must be at least 2 characters long.' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString({ message: 'The password must be a string.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  password: string;

  @IsString({ message: 'The password confirmation must be a string.' })
  passwordConfirmation: string;
}
