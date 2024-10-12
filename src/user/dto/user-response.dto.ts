import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @Exclude()
  password: string;
}
