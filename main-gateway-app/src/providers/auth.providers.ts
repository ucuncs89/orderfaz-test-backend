import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import 'dotenv/config';
@Injectable()
export class AuthProvider {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: Number(process.env.APP_PORT_AUTH_SERVICE),
        host: process.env.APP_HOST_AUTH_SERVICE,
      },
    });
  }

  async send(message: any, payload: any): Promise<any> {
    return await this.client.send(message, payload).toPromise();
  }
}
