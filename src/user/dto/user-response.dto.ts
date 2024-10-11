import { Exclude } from 'class-transformer';

export class UserResponseDto {
  username: string;
  email: string;

  @Exclude()
  password: string;
}
