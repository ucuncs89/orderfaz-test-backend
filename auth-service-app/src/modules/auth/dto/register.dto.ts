import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  msisdn: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
