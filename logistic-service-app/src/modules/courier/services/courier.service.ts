import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourierEntity } from 'src/entities/courier.entity';
import { Repository } from 'typeorm';
import { FindCourierDto } from '../dto/find-courier.dto';

@Injectable()
export class CourierService {
  constructor(
    @InjectRepository(CourierEntity)
    private courierRepository: Repository<CourierEntity>,
  ) {}

  async findAll() {
    const data = await this.courierRepository.find();
    return data;
  }

  async findOneByOriginAndDestination(findCourierDto: FindCourierDto) {
    const data = await this.courierRepository
      .createQueryBuilder()
      .where('LOWER(origin_name) = LOWER(:origin_name)', {
        origin_name: findCourierDto.origin_name,
      })
      .where('LOWER(destination_name) = LOWER(:destination_name)', {
        destination_name: findCourierDto.destination_name,
      })
      .getMany();
    return data;
  }
}
