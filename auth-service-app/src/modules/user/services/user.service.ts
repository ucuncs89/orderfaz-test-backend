import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOneByMSISDN(msisdn: string) {
    const data = await this.usersRepository
      .createQueryBuilder()
      .where('LOWER(msisdn) = LOWER(:msisdn)', { msisdn })
      .getOne();
    return data;
  }
  async findOneByUsername(username: string) {
    const data = await this.usersRepository
      .createQueryBuilder()
      .where('LOWER(username) = LOWER(:username)', { username })
      .getOne();
    return data;
  }
  async findUserById(user_id: string) {
    const data = await this.usersRepository.findOne({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        msisdn: true,
        username: true,
      },
    });
    if (!data) {
      throw { error: { message: 'User Not Found', code: 404 } };
    }
    return data;
  }
}
