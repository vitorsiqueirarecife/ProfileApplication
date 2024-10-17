import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString({ message: 'The password must be a string.' })
  password: string;
}
