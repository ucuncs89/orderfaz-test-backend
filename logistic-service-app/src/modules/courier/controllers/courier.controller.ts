import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CourierService } from '../services/courier.service';

@Controller()
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @MessagePattern({ cmd: 'find-all-courier' })
  async findAll() {
    try {
      const data = await this.courierService.findAll();
      return data;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'search-courier' })
  async getCourierByDestinationAndOrigin(@Payload() findCourierDto) {
    try {
      const data =
        await this.courierService.findOneByOriginAndDestination(findCourierDto);
      return data;
    } catch (error) {
      return error;
    }
  }
}
