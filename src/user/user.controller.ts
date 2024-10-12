import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateUserProfileDto } from '../user/dto/update-user-profile.dto';

@Controller('user')
export class UserController {
  private usersService: UserService;

  constructor(usersService: UserService) {
    this.usersService = usersService;
  }

  @Get('profile')
  getProfile(@Body() body: { userId: string }) {
    return this.usersService.findOneById(body.userId);
  }

  @Put('update')
  async updateProfile(@Body() updateData: UpdateUserProfileDto) {
    return this.usersService.update(updateData.userId, updateData);
  }
}
