import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './providers/auth.providers';
import { LogisticController } from './controllers/logistic.controller';
import { LogisticProvider } from './providers/logistic.providers';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRED },
    }),
  ],
  controllers: [AuthController, LogisticController],
  providers: [AuthProvider, LogisticProvider],
})
export class AppModule {}
