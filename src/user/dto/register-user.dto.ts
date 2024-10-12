import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Transform(({ value }) => value.trim())
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Transform(({ value }) => value.trim())
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
