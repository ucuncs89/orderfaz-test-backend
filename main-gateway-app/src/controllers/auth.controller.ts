import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';

import { RegisterDto } from '../dto/register.dto';
import { failedResponse } from 'src/utils/failed-response';

import { AuthProvider } from 'src/providers/auth.providers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const data: any = await this.authProvider.send(
      { cmd: 'register-auth' },
      { ...registerDto },
    );

    if (data.error) {
      return failedResponse(data.error, data.error.code);
    }
    return { data };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const data = await this.authProvider.send(
      { cmd: 'login-auth' },
      { ...loginDto },
    );

    if (data.error) {
      return failedResponse(data.error, data.error.code);
    }
    return { data };
  }
  @Get('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserMe(@Req() req): Promise<any> {
    const data = await this.authProvider.send(
      { cmd: 'find-user-me' },
      { ...req.user },
    );

    if (data.error) {
      return failedResponse(data.error, data.error.code);
    }
    return { data };
  }
}
