import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserProfileDto {
  @IsString()
  readonly userId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Transform(({ value }) => value.trim())
  username?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim())
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password is too short (minimum 6 characters)' })
  @Transform(({ value }) => value.trim())
  password?: string;
}
