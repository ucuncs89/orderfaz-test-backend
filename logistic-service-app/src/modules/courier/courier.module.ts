import { Module } from '@nestjs/common';
import { CourierService } from './services/courier.service';
import { CourierController } from './controllers/courier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from 'src/entities/courier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourierEntity])],
  controllers: [CourierController],
  providers: [CourierService],
})
export class CourierModule {}
