import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Matches(/^62\d{8,15}$/, {
    message: 'msisdn must start with "62" and consist of a 10-17 digit number',
  })
  msisdn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
