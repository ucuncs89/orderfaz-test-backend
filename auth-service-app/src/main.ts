import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import 'dotenv/config';

const logger = new Logger('Main');
const microServiceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.APP_HOST_SERVICE,
    port: process.env.APP_PORT_SERVICE,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  app.listen().then(() => logger.log('auth service running'));
}
bootstrap();
