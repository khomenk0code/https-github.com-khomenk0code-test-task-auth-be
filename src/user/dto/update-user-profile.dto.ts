import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserProfileDto {
  @IsString()
  readonly userId: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim())
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password is too short (minimum 6 characters)' })
  @Transform(({ value }) => value.trim())
  password?: string;
}
