import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'find-user-me' })
  async login(@Payload() userId: string) {
    try {
      const data = await this.userService.findUserById(userId);
      return data;
    } catch (error) {
      return error;
    }
  }
}
