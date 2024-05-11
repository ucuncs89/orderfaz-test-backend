import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './config/database.config';

import { CourierModule } from './modules/courier/courier.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    CourierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
