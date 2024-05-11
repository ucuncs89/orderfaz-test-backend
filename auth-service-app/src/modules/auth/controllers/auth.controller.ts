import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register-auth' })
  async register(@Payload() registerDto) {
    try {
      const data = await this.authService.register(registerDto);
      return data;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'login-auth' })
  async login(@Payload() loginDto) {
    try {
      const data = await this.authService.login(loginDto);
      return data;
    } catch (error) {
      return error;
    }
  }
}
