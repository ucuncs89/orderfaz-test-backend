import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/constant/saltOrRounds';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const findOneByUsername = await this.userService.findOneByUsername(
      registerDto.username,
    );
    if (findOneByUsername) {
      throw { error: { message: 'Username Already Exist', code: 400 } };
    }
    const findOneByMSISDN = await this.userService.findOneByMSISDN(
      registerDto.msisdn,
    );

    if (findOneByMSISDN) {
      throw { error: { message: 'MSISDN Already Exist', code: 400 } };
    }
    const passwordHash = await bcrypt.hash(registerDto.password, saltOrRounds);
    try {
      const data = await this.usersRepository.insert({
        msisdn: registerDto.msisdn,
        name: registerDto.name,
        password: passwordHash,
        username: registerDto.username,
      });
      return data;
    } catch (error) {
      throw { error };
    }
  }
  async login(loginDto: LoginDto) {
    const findOneByMSISDN = await this.userService.findOneByMSISDN(
      loginDto.msisdn,
    );
    if (!findOneByMSISDN) {
      throw { error: { message: 'User Not Found', code: 404 } };
    }
    const comparePassword = await bcrypt.compare(
      loginDto.password,
      findOneByMSISDN.password,
    );
    if (!comparePassword) {
      throw { error: { message: 'User Not Match Password', code: 400 } };
    }
    const payloadJwt = {
      id: findOneByMSISDN.id,
    };
    const token = this.jwtService.sign(payloadJwt);
    return { token };
  }
}
