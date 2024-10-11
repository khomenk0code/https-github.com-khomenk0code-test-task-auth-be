import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../user/dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { success: true };
  }

  async login(loginCredentials: { username: string; password: string }) {
    const user = await this.validateUser(
      loginCredentials.username,
      loginCredentials.password,
    );
    return { success: !!user };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { username, email, password, passwordConfirm } = registerUserDto;

    const existingUserByEmail = await this.usersService.findOneByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException(`User with email:${email} already exists`);
    }

    const existingUserByUsername =
      await this.usersService.findOneByUsername(username);
    if (existingUserByUsername) {
      throw new ConflictException(
        `User with username:${username} already exists`,
      );
    }

    if (password !== passwordConfirm) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const user = await this.usersService.create(username, email, password);

    const userObject = user.toObject();

    return plainToInstance(UserResponseDto, {
      username: userObject.username,
      email: userObject.email,
    });
  }
}
